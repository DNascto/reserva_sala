import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, from as observableFromPromise } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';

export class NotAuthenticatedError { }

@Injectable({
    providedIn: 'root'
})

export class LoginHttp extends HttpClient {

    constructor(
        private loginService: AuthService,
        private httpHandler: HttpHandler) {
        super(httpHandler);
    }

    public delete<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.delete<T>(url, options));
    }

    public patch<T>(url: string, body: any, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.patch<T>(url, options));
    }

    public head<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.head<T>(url, options));
    }

    public options<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.options<T>(url, options));
    }

    public get<T>(url: string, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.get<T>(url, options));
    }

    public post<T>(url: string, body: any, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.post<T>(url, body, options));
    }

    public put<T>(url: string, body: any, options?: any): Observable<T> {
        return this.fazerRequisicao<T>(() => super.put<T>(url, body, options));
    }

    // tslint:disable-next-line: ban-types
    private fazerRequisicao<T>(fn: Function): Observable<T> {
        if (this.loginService.isAccessTokenInvalido()) {
            // console.log('Requisição HTTP com access token inválido. Obtendo novo token...');
            const chamadaNovoAccessToken = this.loginService.obterNovoAccessToken()
                .then(() => {
                    if (this.loginService.isAccessTokenInvalido()) {
                        throw new NotAuthenticatedError();
                    }

                    return fn().toPromise();
                });

            return observableFromPromise(chamadaNovoAccessToken);

        } else {
            return fn();
        }
    }
}
