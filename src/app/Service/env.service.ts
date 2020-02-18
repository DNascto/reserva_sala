import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EnvService {

  API_URL = 'https://dry-journey-31622.herokuapp.com';
  headers: HttpHeaders;
  
  constructor() {
    const token = localStorage.getItem('access_token');
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8')
                               .set('Authorization', 'Bearer ' + token);
   }


}
