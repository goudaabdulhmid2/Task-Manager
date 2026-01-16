import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../services/notification.service';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="notification-container">
      <div
        *ngFor="let notification of notifications"
        class="notification-toast"
        [class]="'toast-' + notification.type"
      >
        <div class="toast-wrapper">
          <div class="toast-icon-wrapper">
            <div class="toast-icon">{{ getIcon(notification.type) }}</div>
          </div>
          <div class="toast-content">
            <p class="toast-message">{{ notification.message }}</p>
          </div>
          <button
            class="toast-close"
            (click)="notificationService.remove(notification.id)"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div class="toast-progress" [style.animation-duration.ms]="notification.duration"></div>
      </div>
    </div>
  `,
    styles: [`
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 420px;
    }

    .notification-toast {
      pointer-events: auto;
      animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .toast-wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem 1.5rem;
      min-height: 70px;
    }

    /* Success Toast */
    .toast-success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .toast-success .toast-progress {
      background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.1));
    }

    /* Error Toast */
    .toast-error {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    .toast-error .toast-progress {
      background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.1));
    }

    /* Warning Toast */
    .toast-warning {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }

    .toast-warning .toast-progress {
      background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.1));
    }

    /* Info Toast */
    .toast-info {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    }

    .toast-info .toast-progress {
      background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.1));
    }

    .toast-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 12px;
      flex-shrink: 0;
    }

    .toast-icon {
      font-size: 1.75rem;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }

    .toast-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .toast-message {
      margin: 0;
      color: white;
      font-size: 0.95rem;
      font-weight: 500;
      line-height: 1.5;
      letter-spacing: 0.3px;
    }

    .toast-close {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      cursor: pointer;
      border-radius: 8px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    .toast-close:hover {
      background: rgba(255, 255, 255, 0.35);
      transform: scale(1.1);
    }

    .toast-close:active {
      transform: scale(0.95);
    }

    .toast-progress {
      height: 3px;
      animation: progressBar var(--duration, 4000ms) linear forwards;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px) translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateX(0) translateY(0);
        opacity: 1;
      }
    }

    @keyframes progressBar {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }

    @media (max-width: 640px) {
      .notification-container {
        left: 10px;
        right: 10px;
        top: 10px;
        max-width: none;
      }

      .notification-toast {
        border-radius: 12px;
      }

      .toast-wrapper {
        padding: 1rem 1.25rem;
      }

      .toast-icon-wrapper {
        width: 44px;
        height: 44px;
      }

      .toast-message {
        font-size: 0.9rem;
      }

      .toast-close {
        width: 32px;
        height: 32px;
      }
    }
  `],
})
export class NotificationComponent implements OnInit {
    notifications: Notification[] = [];

    constructor(public notificationService: NotificationService) { }

    ngOnInit(): void {
        this.notificationService.notifications$.subscribe((notifications) => {
            this.notifications = notifications;
        });
    }

    getIcon(type: string): string {
        const icons: { [key: string]: string } = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ⓘ'
        };
        return icons[type] || 'ⓘ';
    }
}
