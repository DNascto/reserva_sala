import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Booking } from '../Models/Booking';
import { Observable } from 'rxjs';
import { API_URL } from './app.api';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = API_URL + '/booking';
    }

    getAllReservation(): Observable<Booking[]> {
        return this.http.get<Booking[]>(this.baseUrl + '/bookings');
    }

    getBookingByApprovation(approvation: boolean): Observable<Booking[]> {
        const params = new HttpParams().set('approved', approvation.toString());
        return this.http.get<Booking[]>(this.baseUrl + '/approve', { params });
    }

    getAllBookingByAuthor(name: string): Observable<Booking[]> {
        const params = new HttpParams().set('authorName', name);
        return this.http.get<Booking[]>(this.baseUrl + '/author', { params });
    }

    postReservation(reservation: Booking): Observable<any> {
        return this.http.post(this.baseUrl, reservation);
    }

    putByApprovation(booking: Booking): Observable<Booking[]> {
        const params = new HttpParams().set('booking', booking.toString());
        return this.http.put<Booking[]>(this.baseUrl, { params });
    }

    deleteBooking(booking: Booking): Observable<Booking[]> {
        const params = new HttpParams().set('booking', booking.toString());
        return this.http.put<Booking[]>(this.baseUrl, { params });
    }
}
