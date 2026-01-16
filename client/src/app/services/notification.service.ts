import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationsSubject = new BehaviorSubject<Notification[]>([]);
    public notifications$ = this.notificationsSubject.asObservable();
    private notificationId = 0;

    constructor() { }

    show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 4000): void {
        const id = `notification-${++this.notificationId}`;
        const notification: Notification = {
            id,
            message,
            type,
            duration
        };

        const currentNotifications = this.notificationsSubject.value;
        this.notificationsSubject.next([...currentNotifications, notification]);

        // Auto-remove after duration
        setTimeout(() => {
            this.remove(id);
        }, duration);
    }

    success(message: string, duration?: number): void {
        this.show(message, 'success', duration);
    }

    error(message: string, duration?: number): void {
        this.show(message, 'error', duration || 5000);
    }

    warning(message: string, duration?: number): void {
        this.show(message, 'warning', duration);
    }

    info(message: string, duration?: number): void {
        this.show(message, 'info', duration);
    }

    remove(id: string): void {
        const currentNotifications = this.notificationsSubject.value;
        this.notificationsSubject.next(
            currentNotifications.filter(n => n.id !== id)
        );
    }

    clear(): void {
        this.notificationsSubject.next([]);
    }
}
