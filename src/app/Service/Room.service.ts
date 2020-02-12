import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Room } from '../Models/Room';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    // url = 'http://localhost:8080';      
    headers: HttpHeaders;
    // token;

    constructor(protected http: HttpClient, private env: EnvService) {
        // // this.headers = env.headers;
        // this.token = localStorage.getItem('token');
        // this.headers = new HttpHeaders();
        // this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8')
        //     .set('Authorization', 'Bearer ' + token);
    }

    getRoom() {
        return this.http.get<Room>(this.env.API_URL + '/room', { headers: this.headers });
    }

    getAllFreeRoom() {
        const token = JSON.parse(localStorage.getItem('token'));

        // const hand = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8', 'Authorization': token});
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8')
                                   .set('Authorization', token);
                                                
        console.log(this.http.get<Room[]>(this.env.API_URL + '/rooms', { headers: new HttpHeaders({'Authorization': token}) }));
            
        return this.http.get<Room[]>(this.env.API_URL + '/rooms', { headers: this.headers });
    }

    getAllRoom() {
        return this.http.get<Room[]>(this.env.API_URL + '/all', { headers: this.headers });
    }

    getCountRoom(booked: boolean) {
        const params = new HttpParams().set('booked', booked.toString());
        return this.http.get<number>(this.env.API_URL + '/count/', { params, headers: this.headers });
    }
}