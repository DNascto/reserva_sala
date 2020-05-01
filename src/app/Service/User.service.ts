import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../Models/User';
import { Observable } from 'rxjs';
import { API_URL } from './app.api';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = API_URL + '/user';
    }

    getUserById(id: number) {
        const params = new HttpParams().set('id', id.toString());
        return this.http.get<User>(this.baseUrl, { params });
    }

    // ainda nao criado
    // getAllUsers() {
    //     return this.http.get<User[]>( this.url + '/users');
    // }

    postNewUser(user: User): Observable<any> {
        return this.http.post(this.baseUrl + '/new', user);
    }

    postNewCompany(user: User): Observable<any> {
        return this.http.post(this.baseUrl + '/newCompany', user);
    }

    putEditUser(user: User): Observable<any> {
        return this.http.put(this.baseUrl, user);
    }

    // getCompanyName(id: number): Observable<string> {
    //     this.setHeaders();
    //     const params = new HttpParams().set('id', id.toString());
    //     return this.http.get<string>(this.baseUrl + '/companyName', { headers: this.headers, params });
    // }
}
