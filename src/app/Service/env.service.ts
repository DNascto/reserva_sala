import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EnvService {

  API_URL = 'http://localhost:8080';
  headers: HttpHeaders;
  
  constructor() {
    const token = localStorage.getItem('access_token');
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8')
                               .set('Authorization', 'Bearer ' + token);
   }


}
