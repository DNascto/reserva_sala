import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Reservation } from '../Models/Reservation';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    // url = 'http://localhost:8080';
    private headers: HttpHeaders;
    
    constructor(private http: HttpClient, private env: EnvService) { }

    getAllReservation(): Observable<Reservation[]> {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.get<Reservation[]>(this.env.API_URL + '/bookings', { headers: this.headers });
    }

    getBookingByApprovation(approvation: boolean): Observable<Reservation[]> {        
        const params = new HttpParams().set('approved', approvation.toString());
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.get<Reservation[]>(this.env.API_URL + '/approve', { params , headers: this.headers });
    }

    getAllBookingByAuthor(name: string): Observable<Reservation[]> {        
        const params = new HttpParams().set('authorName', name);
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.get<Reservation[]>(this.env.API_URL + '/author', { params , headers: this.headers });
    }

    postReservation(reservation: Reservation): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.env.API_URL + '/booking', reservation, { headers: this.headers });
    }

    putByApprovation(booking: Reservation): Observable<Reservation[]> {        
        const params = new HttpParams().set('booking', booking.toString());
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<Reservation[]>(this.env.API_URL + '/booking', { params , headers: this.headers });
    }

    deleteBooking(booking: Reservation): Observable<Reservation[]> {        
        const params = new HttpParams().set('booking', booking.toString());
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put<Reservation[]>(this.env.API_URL + '/booking', { params , headers: this.headers });
    }
}