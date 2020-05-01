import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './app.api';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    jwtPayload: any;
    tokenString: any;

    oauthTokenURL: string;
    tokenRevokeURL: string;

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService
    ) {
        this.jwtPayload = '';
        this.oauthTokenURL = `${API_URL}/oauth/token`;
        this.tokenRevokeURL = `${API_URL}/token/revoke`;
        this.carregarToken();
    }

    login(usuario: string, senha: string): Promise<void> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

        const body = `username=${usuario}&password=${senha}&grant_type=password`;

        return this.http.post<any>(this.oauthTokenURL, body, { headers, withCredentials: true })
            .toPromise()
            .then(response => {
                this.armazenarToken(response.access_token);
                this.armazenarNome(this.jwtPayload.name);
            })
            .catch(response => {
                if (response.status === 400) {
                    if (response.error === 'invalid_grant') {
                        return Promise.reject('Usuário ou senha inválida!');
                    }
                }

                return Promise.reject(response);
            });
    }

    obterNovoAccessToken(): Promise<void> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

        const body = 'grant_type=refresh_token';

        return this.http.post<any>(this.oauthTokenURL, body, { headers, withCredentials: true })
            .toPromise()
            .then(response => {
                this.armazenarToken(response.access_token);
                // console.log('Novo access token criado!');

                return Promise.resolve(null);
            })
            .catch(response => {
                console.error('Erro ao renovar token.', response);
                return Promise.resolve(null);
            });
    }

    limparAccessToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('accessLevel');
        localStorage.clear();
        this.jwtPayload = null;
    }

    isAccessTokenInvalido() {
        const token = localStorage.getItem('token');
        if (this.jwtHelper.isTokenExpired(token)) {
            this.limparAccessToken();
        }
        return !token || this.jwtHelper.isTokenExpired(token);
    }

    isLogged(): boolean {
        return !this.isAccessTokenInvalido();
    }

    temPermissao(permissao: string) {
        console.log('verificando permissoes');
        return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
    }

    temQualquerPermissao(roles) {
        console.log('verificando qualquer permissao');
        for (const role of roles) {
            if (this.temPermissao(role)) {
                return true;
            }
        }
        return false;
    }

    private armazenarToken(token: string) {
        this.jwtPayload = this.jwtHelper.decodeToken(token);
        localStorage.setItem('token', token);
    }

    armazenarNome(name: string) {
        localStorage.setItem('name', name);
    }

    private carregarToken() {
        const token = localStorage.getItem('token');

        if (token) {
            this.armazenarToken(token);
        }
    }

    logout() {
        const headers = new HttpHeaders()
            .append('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.delete(this.tokenRevokeURL, { headers, withCredentials: true })
            .toPromise()
            .then(() => {
                this.limparAccessToken();
            });
    }

    // resetPassword(user: UserCandidate) {
    //     return this.http.patch(`${API_URL}/user/reset-password`, user);
    // }
}
