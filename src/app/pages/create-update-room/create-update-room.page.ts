import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/Models/User';
import { AlertService } from 'src/app/Service/alert.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { RoomService } from 'src/app/Service/Room.service';
import { Room } from 'src/app/Models/Room';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-create-update-room',
  templateUrl: './create-update-room.page.html',
  styleUrls: ['./create-update-room.page.scss'],
})
export class CreateUpdateRoomPage implements OnInit {
  cpfLabel;
  logado: boolean;

  roomForm: FormGroup;

  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private alertService: AlertService,
    private menu: MenuController,
    private route: Router,
    private errorHandler: ErrorHandlerService
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.roomForm = new FormGroup({
      name: new FormControl('', Validators.required),
      places: new FormControl('', Validators.required),
      projector: new FormControl(''),
      // computer: new FormControl(''),
      description: new FormControl(''),
      additional: new FormControl('')
    });
  }

  register() {
    const room = new Room().create(
      this.roomForm.controls.name.value,
      this.authService.jwtPayload.company,
      this.roomForm.controls.places.value,
      this.roomForm.controls.projector.value ? this.roomForm.controls.projector.value : false,
      this.roomForm.controls.additional.value ? this.roomForm.controls.additional.value : '',
      this.roomForm.controls.description.value ? this.roomForm.controls.description.value : '',
      false
    );

    console.log(room);

    this.roomService.createRoom(room).subscribe(
      () => {
        this.alertService.presentToast('Nova sala cadastrada com sucesso.');
        this.clearForm();
      },
      error => {
        console.log(error);

        this.errorHandler.handle(error);
      },
      () => { /* colocar um popup para cadastrar outro usuario ou voltar a home*/ }
    );
  }

  clearForm() {
    this.roomForm.controls.name.setValue('');
    this.roomForm.controls.places.setValue('');
    this.roomForm.controls.projector.setValue(false);
    this.roomForm.controls.additional.setValue('');
    this.roomForm.controls.description.setValue('');
  }
}
