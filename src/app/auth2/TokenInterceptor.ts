import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { AuthenticationService } from './_services/authentication.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                // 'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${this.auth.token }`
            }
        });
        // console.log(request);
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                    // console.log(event.status);
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        // redirect to the login route
                        // or show a modal
                        // console.log(err.status);
                        this.auth.logout();
                    }
                }
            })
        );
    }
}
