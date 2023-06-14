import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  showSuccessToast(message: string) {
    this.showToast(message, 'success');
  }

  showErrorToast(message: string) {
    this.showToast(message, 'danger');
  }

  private showToast(message: string, color: string) {
    this.toastController
      .create({
        message: message,
        duration: 2000,
        color: color,
      })
      .then(toast => {
        toast.present();
      });
  }
}
