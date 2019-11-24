import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsLetterService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private router: Router) {
  }

  register({ email, 'g-recaptcha-response': recaptcha }: { email: string, 'g-recaptcha-response'?: string}) {
    return this.http.post(`${environment.ApiBaseUrl}/newsletter`, { email, 'g-recaptcha-response': recaptcha }, this.jwtLite()).pipe(
      map((response: any) => {
        return ;
      })
    );
  }

  private jwtLite() {
    // create authorization header with jwt token
    const token = this.localStorage.getItem('token');
    if (token) {

      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        })
      };
    }
  }
}
