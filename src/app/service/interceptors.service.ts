import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthDetail } from '../common/util/auth-detail';
import { DateUtils } from '../common/util/date.util';

@Injectable()
export class Interceptors implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add headers for crawlers
    const modifiedRequest = request.clone({
      setHeaders: {
        'X-Robots-Tag': 'index, follow'
      }
    });
    return next.handle(modifiedRequest);
  }
}
