import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const timeout = setTimeout(() => {
      this.loaderService.show();
    }, 2000);
    return next.handle(req).pipe(
      finalize(() => {
        clearTimeout(timeout);
        this.loaderService.hide();
      })
    );
  }
}
