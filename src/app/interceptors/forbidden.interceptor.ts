import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);
        if ([403].indexOf(err.status) !== -1) {
          //window.location.href = '/';
          this.router.navigate(['']);
          console.log("forbidden")
        }
        return throwError(err);
      })

    );
  }
}
