import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/User';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    url = 'http://localhost:8080';
    private headers: HttpHeaders;

    constructor(private http: HttpClient, private env: EnvService) { }

    getUserById(id: number) {
        const params = new HttpParams().set('id', id.toString());
        return this.http.get<User>( this.url + '/user', { params });
    }
    
    // ainda nao criado
    // getAllUsers() {
    //     return this.http.get<User[]>( this.url + '/users');
    // }
  
    postNewUser(user: User): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.env.API_URL + '/user', user, {headers: this.headers});
    }

    putEditUser(user: User): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put(this.env.API_URL + '/user', user, {headers: this.headers});
    }
}