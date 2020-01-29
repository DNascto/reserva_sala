import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../Component/Reservation';

@Injectable()
export class ReservationService {
    url = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    getReservation() {
        return this.http.get<Reservation>( this.url + '/booking');
    }

    postReservation(reservation: Reservation) {
        return this.http.post( this.url + '/booking', reservation);
    }

}