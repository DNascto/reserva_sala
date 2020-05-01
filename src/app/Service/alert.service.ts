import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private toastController: ToastController) { }

  async presentToast(messagem: any) {
    const toast = await this.toastController.create({
      message: messagem,
      duration: 3000,
      // position: 'top',
      color: 'dark'
    });
    toast.present();
  }

  async presentFixedToast(messagem: any) {
    const toast = await this.toastController.create({
      message: messagem,
      // position: 'top',
      color: 'dark',
      buttons: [
         {
          text: 'X',
          role: 'cancel'// ,
          // handler: () => {
          //   console.log('Cancel clicked');
          // }
        }
      ]
    });
    toast.present();
  }
}
