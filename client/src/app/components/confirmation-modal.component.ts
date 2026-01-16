import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, ConfirmationState } from '../services/confirmation.service';

@Component({
    selector: 'app-confirmation-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="confirmation-overlay" *ngIf="state.isOpen" (click)="onBackdropClick()">
      <div class="confirmation-modal" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">{{ state.config?.title }}</h2>
        </div>

        <div class="modal-body">
          <p class="modal-message">{{ state.config?.message }}</p>
        </div>

        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            (click)="onCancel()"
          >
            {{ state.config?.cancelText }}
          </button>
          <button
            class="btn btn-primary"
            [class.btn-danger]="state.config?.isDangerous"
            (click)="onConfirm()"
          >
            {{ state.config?.confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .confirmation-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .confirmation-modal {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      max-width: 420px;
      width: 90%;
      overflow: hidden;
      animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .modal-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      letter-spacing: 0.3px;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .modal-message {
      margin: 0;
      font-size: 0.95rem;
      color: #6b7280;
      line-height: 1.6;
      letter-spacing: 0.3px;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    .btn {
      padding: 0.625rem 1.25rem;
      border: none;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      letter-spacing: 0.3px;
      outline: none;
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .btn:active {
      transform: translateY(0);
    }

    .btn-secondary {
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #e5e7eb;
      border-color: #9ca3af;
    }

    .btn-secondary:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
    }

    .btn-primary:hover {
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:focus {
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    }

    .btn-danger {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    .btn-danger:hover {
      box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
    }

    .btn-danger:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }

    @media (max-width: 480px) {
      .confirmation-modal {
        width: 95%;
      }

      .modal-header {
        padding: 1.25rem;
      }

      .modal-title {
        font-size: 1.1rem;
      }

      .modal-body {
        padding: 1.25rem;
      }

      .modal-message {
        font-size: 0.9rem;
      }

      .modal-footer {
        padding: 1.25rem;
        flex-direction: column-reverse;
      }

      .btn {
        width: 100%;
      }
    }
  `]
})
export class ConfirmationModalComponent implements OnInit {
    state: ConfirmationState = {
        isOpen: false,
        config: null
    };

    constructor(private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.confirmationService.state$.subscribe((state) => {
            this.state = state;
        });
    }

    onConfirm(): void {
        this.confirmationService.handleConfirm();
    }

    onCancel(): void {
        this.confirmationService.handleCancel();
    }

    onBackdropClick(): void {
        this.onCancel();
    }

    @HostListener('document:keydown.escape')
    onEscapeKey(): void {
        if (this.state.isOpen) {
            this.onCancel();
        }
    }
}
