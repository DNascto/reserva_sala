import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    public snackBar: AlertService
    // , private router: Router
    ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

      // } else if (errorResponse instanceof NotAuthenticatedError) {
      //   msg = 'Sua sessão expirou!';
      //   this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {

      msg = 'Ocorreu um erro ao processar a sua solicitação.';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação.';
      }

      try {
        msg = 'Usuário inexistente ou senha inválida.';
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else if (errorResponse.status >= 500) {
      msg = errorResponse.message;
      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.snackBar.presentToast(msg);
  }

}