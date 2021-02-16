import {Inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { AuthenticationService } from '@app/auth2/_services';
import {LOCAL_STORAGE} from "@ng-toolkit/universal";
import {AuthFirebaseService} from "@core/auth/_services";
import {environment} from "@environments/environment";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
      private auth: AuthFirebaseService,
      @Inject(LOCAL_STORAGE) private localStorage: any
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.localStorage.getItem(environment.authTokenKey);
    request = request.clone({
      setHeaders: {
        // 'Content-Type': 'application/json', // Uncomment this will lock file upload by overwriting necessary Content-Type: multipart/form-data;
        Accept: 'application/json',
        // 'X-CSRF-TOKEN': ''
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(request);
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        // console.log(event.status);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
          // console.log(err.status);
          this.auth.fireLogout();
        }
      }
    }));
  }
}
