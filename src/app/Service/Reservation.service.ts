import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reservation } from '../Component/Reservation';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    url = 'http://localhost:8080';
    private headers: HttpHeaders;
    constructor(private http: HttpClient) { }

    getAllReservation(): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.get<any>(this.url + '/bookings', { headers: this.headers });
    }

    postReservation(reservation: Reservation): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.url + '/booking', reservation, {headers: this.headers});
    }

}