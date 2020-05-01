import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';

export class NotAuthenticatedError { }

@Injectable({
  providedIn: 'root'
})

export class LoginHttpInterceptor implements HttpInterceptor {

  withouAuthUrl: string[] = ['/oauth/token', '/user/reset-password'];

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token && this.needAuth(request.url)) {
      request = request.clone({
        setHeaders: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`
        },
        setParams: {
          company: this.authService.jwtPayload.company
        }
      });
    }

    return next.handle(request);
  }

  private needAuth(url: string): boolean {
    for (const partialUrl of this.withouAuthUrl) {
      if (url.includes(partialUrl)) {
        return false;
      }
    }

    return true;
  }
}
