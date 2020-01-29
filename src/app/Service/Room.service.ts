import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../Component/Room';

@Injectable()
export class RoomService {
    url = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    getRoom() {
        return this.http.get<Room>( this.url + '/rooms');
    }

}