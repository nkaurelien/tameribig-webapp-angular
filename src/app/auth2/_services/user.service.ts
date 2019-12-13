import {Injectable} from '@angular/core';

import {User} from '../_models/index';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment';



@Injectable()
export class UserService {
    private ApiBaseUrl: string;
    constructor(private http: HttpClient) {
        this.ApiBaseUrl = environment.ApiBaseUrl;
    }


    forgotPassword(email: string) {
        return this.http.post('/forgot-password', JSON.stringify({email}), this.jwt())/*.pipe(
            map((response: Response) => response.json())
        )*/;
    }

    getById(id: string) {
        return this.http.get<any>('/users/' + id, this.jwt()).pipe(
            map((response) => response.data || response)
        );
    }

    getByUsername(uname: string) {
        return this.http.get<any>(this.ApiBaseUrl + '/users/' + uname, this.jwt()).pipe(
            map((response) => response.data || response)
        );
    }

    create(user: User) {
        return this.http.post('/users', user, this.jwt())/*.map((response: Response) => response.json())*/;
    }

    update(user: User) {
        return this.http.put('/users/' + user.uid, user, this.jwt())/*.map((response: Response) => response.json())*/;
    }

    // private helper methods

    private jwt() {
        const headers = new HttpHeaders({

            'Content-Type':  'application/json',
            Accept:  'application/json',
            // 'X-CSRF-TOKEN' : '',
            Authorization: 'Bearer '});
        return {headers};
    }
}
