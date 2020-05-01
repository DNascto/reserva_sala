import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Room } from '../Models/Room';
import { API_URL } from './app.api';
import { Observable } from 'rxjs';
import { LoginHttp } from '../pages/auth/token/login-http';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private baseUrl: string;

    constructor(protected http: HttpClient, private httpLogado: LoginHttp) {
        this.baseUrl = API_URL + '/room';
    }

    getRoom() {
        return this.http.get<Room>(this.baseUrl);
    }

    getAllFreeRoom() {
        return this.http.get<Room[]>(this.baseUrl + '/rooms');
    }

    getAllRoom() {
        return this.http.get<Room[]>(this.baseUrl + '/all');
    }

    getCountRoom(booked: boolean) {
        const params = new HttpParams().set('booked', booked.toString());
        return this.http.get<number>(this.baseUrl + '/count/', { params });
    }

    createRoom(room: Room): Observable<Room> {
        return this.httpLogado.post<Room>(this.baseUrl, room);
    }

    updateRoom(room: Room) {
        return this.http.put<Room>(this.baseUrl, room);
    }

    updateApprovation(room: Room) {
        return this.http.put<Room>(this.baseUrl + '/approvation', room);
    }

    deleteRoom(room: Room) {
        console.log(room);
        const params = new HttpParams().set('room', JSON.stringify(room));
        console.log(params);
        return this.http.delete<Room>(this.baseUrl, { params });
    }

    deleteRoomById(id: number) {
        const params = new HttpParams().set('id', id.toString());
        console.log(params);
        return this.http.delete<Room>(this.baseUrl, { params });
    }
}
