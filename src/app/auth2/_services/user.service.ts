import {Injectable} from '@angular/core';

import {User} from '../_models/index';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
    }

    verify() {
        return this.http.get('/api/verify', this.jwt())/*.map((response: Response) => response.json())*/;
    }

    forgotPassword(email: string) {
        return this.http.post('/api/forgot-password', JSON.stringify({email}), this.jwt())/*.pipe(
            map((response: Response) => response.json())
        )*/;
    }

    getAll() {
        return this.http.get('/api/users', this.jwt())/*.map((response: Response) => response.json())*/;
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt())/*.map((response: Response) => response.json())*/;
    }

    create(user: User) {
        return this.http.post('/api/users', user, this.jwt())/*.map((response: Response) => response.json())*/;
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.uid, user, this.jwt())/*.map((response: Response) => response.json())*/;
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt())/*.map((response: Response) => response.json())*/;
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new HttpHeaders({

                'Content-Type':  'application/json',
                'Accept':  'application/json',
                // 'X-CSRF-TOKEN' : '',
                'Authorization': 'Bearer ' + currentUser.token});
            return {headers: headers};
        }
        return null;
    }
}
