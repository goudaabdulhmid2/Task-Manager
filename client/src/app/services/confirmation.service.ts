import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ConfirmationConfig {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDangerous?: boolean;
}

export interface ConfirmationState {
    isOpen: boolean;
    config: ConfirmationConfig | null;
}

@Injectable({
    providedIn: 'root'
})
export class ConfirmationService {
    private initialState: ConfirmationState = {
        isOpen: false,
        config: null
    };

    private confirmationState$ = new BehaviorSubject<ConfirmationState>(this.initialState);
    public state$ = this.confirmationState$.asObservable();

    private resolveConfirmation: ((value: boolean) => void) | null = null;

    constructor() { }

    confirm(config: ConfirmationConfig): Promise<boolean> {
        return new Promise((resolve) => {
            this.resolveConfirmation = resolve;
            this.confirmationState$.next({
                isOpen: true,
                config: {
                    title: config.title,
                    message: config.message,
                    confirmText: config.confirmText || 'Confirm',
                    cancelText: config.cancelText || 'Cancel',
                    isDangerous: config.isDangerous || false
                }
            });
        });
    }

    handleConfirm(): void {
        this.close();
        if (this.resolveConfirmation) {
            this.resolveConfirmation(true);
            this.resolveConfirmation = null;
        }
    }

    handleCancel(): void {
        this.close();
        if (this.resolveConfirmation) {
            this.resolveConfirmation(false);
            this.resolveConfirmation = null;
        }
    }

    private close(): void {
        this.confirmationState$.next(this.initialState);
    }
}
