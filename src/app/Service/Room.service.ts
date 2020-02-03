import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Room } from '../Component/Room';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    url = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    getRoom() {
        return this.http.get<Room>( this.url + '/room');
    }
    
    getAllFreeRoom() {
        return this.http.get<Room[]>( this.url + '/rooms');
    }
    
    getAllRoom() {
        return this.http.get<Room[]>( this.url + '/all');
    }
    
    getCountRoom(booked: boolean) {
        const params = new HttpParams().set('booked', booked.toString());
        return this.http.get<number>( this.url + '/count/', { params } );
    }
}