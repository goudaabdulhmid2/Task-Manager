import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Task {
    _id?: string;
    title: string;
    completed: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse {
    status: string;
    data?: any;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:3000/api/v1/tasks';
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    public tasks$ = this.tasksSubject.asObservable();
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadTasks();
    }

    loadTasks(): void {
        this.loadingSubject.next(true);
        this.http.get<any>(this.apiUrl).subscribe({
            next: (response) => {
                const tasks = Array.isArray(response.data) ? response.data : response.data?.tasks || [];
                this.tasksSubject.next(tasks);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('Error loading tasks:', err);
                this.loadingSubject.next(false);
            }
        });
    }

    addTask(title: string): Observable<any> {
        return this.http.post<any>(this.apiUrl, { title, completed: false }).pipe(
            tap((response) => {
                const currentTasks = this.tasksSubject.value;
                this.tasksSubject.next([...currentTasks, response.data]);
            })
        );
    }

    updateTask(id: string, updates: Partial<Task>): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, updates).pipe(
            tap(() => {
                const tasks = this.tasksSubject.value.map((task) =>
                    task._id === id ? { ...task, ...updates } : task
                );
                this.tasksSubject.next(tasks);
            })
        );
    }

    deleteTask(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
            tap({
                next: () => {
                    // Immediately update local state
                    const tasks = this.tasksSubject.value.filter((task) => task._id !== id);
                    this.tasksSubject.next(tasks);
                    // Reload from server to ensure consistency
                    this.loadTasks();
                },
                error: (err) => {
                    if (err.status === 404) {
                        // Task already deleted, remove from local cache anyway
                        const tasks = this.tasksSubject.value.filter((task) => task._id !== id);
                        this.tasksSubject.next(tasks);
                    }
                }
            })
        );
    }
}
