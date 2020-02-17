import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { User } from '../Models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token: any;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private env: EnvService,
  ) { }

  login(cpf: String, password: String): Observable<any>  {
    
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.env.API_URL + '/authenticate',
      { cpf: cpf, password: password }, { headers: this.headers }
    )
    .pipe(
      tap(token => {
        localStorage.setItem('user_with_token', JSON.stringify(token));        
        localStorage.setItem('user', JSON.stringify(token.user));        
        localStorage.setItem('token', JSON.stringify('Bearer ' + token.token));
        // this.storage.setItem('token', token)
        //   .then(
        //     () => {
        //       console.log('Token Stored');
        //     },
        //     error => console.error('Error storing item', error)
        //   );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  logout() {
    /** TODO: descomentar quando for implantar o JWT */ 
    // const headers = new HttpHeaders({
    //   'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    // });
    // return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    //   .pipe(
    //     tap(data => {
          localStorage.removeItem('token');
          this.isLoggedIn = false;
          delete this.token;
          // return data;
      //   })
      // )
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
      .pipe(
        tap(user => {
          return user;
        })
      ) 
  }

  // getToken() {
  //   return this.storage.getItem('token').then(
  //     data => {
  //       this.token = data;
  //       if (this.token != null) {
  //         this.isLoggedIn = true;
  //       } else {
  //         this.isLoggedIn = false;
  //       }
  //     },
  //     error => {
  //       this.token = null;
  //       this.isLoggedIn = false;
  //     }
  //   );
  // }
}
