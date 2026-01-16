import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskService, Task } from './services/task.service';
import { NotificationService } from './services/notification.service';
import { ConfirmationService } from './services/confirmation.service';
import { NotificationComponent } from './components/notification.component';
import { ConfirmationModalComponent } from './components/confirmation-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NotificationComponent, ConfirmationModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  title = 'Task Manager';
  tasks: Task[] = [];
  newTaskTitle = '';
  loading = false;
  filter: 'all' | 'active' | 'completed' = 'all';
  editingId: string | null = null;
  editingTitle = '';
  private destroy$ = new Subject<void>();

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef, private notificationService: NotificationService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.taskService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.tasks = tasks;
        this.cdr.markForCheck();
      });

    this.taskService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.addTask(this.newTaskTitle).subscribe({
      next: () => {
        this.notificationService.success('Task added successfully!');
        this.newTaskTitle = '';
      },
      error: (err) => {
        this.notificationService.error(
          err.error?.message || 'Failed to add task. Please try again.'
        );
      }
    });
  }

  toggleTask(task: Task): void {
    if (!task._id) return;
    this.taskService.updateTask(task._id, { completed: !task.completed }).subscribe({
      next: () => {
        const status = !task.completed ? 'completed' : 'reactivated';
        this.notificationService.success(`Task ${status}!`);
      },
      error: (err) => {
        this.notificationService.error('Failed to update task');
      }
    });
  }

  deleteTask(id: string | undefined): void {
    if (!id) return;

    this.confirmationService.confirm({
      title: 'Delete Task?',
      message: 'This action cannot be undone. Are you sure you want to delete this task?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDangerous: true
    }).then((confirmed) => {
      if (confirmed) {
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            this.notificationService.success('Task deleted successfully!');
          },
          error: (err) => {
            if (err.status !== 404) {
              this.notificationService.error('Failed to delete task');
            }
          }
        });
      }
    });
  }

  getFilteredTasks(): Task[] {
    switch (this.filter) {
      case 'active':
        return this.tasks.filter((t) => !t.completed);
      case 'completed':
        return this.tasks.filter((t) => t.completed);
      default:
        return this.tasks;
    }
  }

  getCompletedCount(): number {
    return this.tasks.filter((t) => t.completed).length;
  }

  getActiveCount(): number {
    return this.tasks.filter((t) => !t.completed).length;
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }

  startEdit(task: Task): void {
    this.editingId = task._id || null;
    this.editingTitle = task.title;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingTitle = '';
  }

  saveEdit(task: Task): void {
    if (!task._id || !this.editingTitle.trim()) return;
    if (this.editingTitle.trim().length < 3) {
      this.notificationService.warning('Task title must be at least 3 characters');
      return;
    }
    if (this.editingTitle === task.title) {
      this.cancelEdit();
      return;
    }
    this.taskService.updateTask(task._id, { title: this.editingTitle.trim() }).subscribe({
      next: () => {
        this.notificationService.success('Task updated successfully!');
        this.cancelEdit();
      },
      error: (err) => {
        this.notificationService.error(
          err.error?.message || 'Failed to update task'
        );
      }
    });
  }
}
