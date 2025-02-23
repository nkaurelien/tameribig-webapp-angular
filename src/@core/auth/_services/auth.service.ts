import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {User} from '../_models/user.model';
import {Permission} from '../_models/permission.model';
import {Role} from '../_models/role.model';
import {catchError, map} from 'rxjs/operators';
import {QueryParamsModel, QueryResultsModel} from '../../_base/crud';
import {environment} from '@environments/environment';
import { AuthFirebaseService } from './auth-firebase.service';
import {
    API_USERS_URL,
    API_PERMISSION_URL,
    API_ROLES_URL,
    API_REGISTER_FIREBASE_URL,
    API_AUTH_PASSWORD_RESET
} from './auth.routes';
import {AuthBackendService} from '@core/auth/_services/auth-backend.service';



@Injectable()
export class AuthService {
    constructor(private http: HttpClient,
                public fireAuth: AuthFirebaseService,
                public apiAuth: AuthBackendService,
    ) {
    }

    register(user: User): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<User>(API_REGISTER_FIREBASE_URL, user, {headers: httpHeaders})
            .pipe(
                map((res: User) => {
                    return res;
                }),
                catchError((error, __) => {
                    if (error.status === 401 || error.status === 403) {
                        // handle error
                    }
                    return throwError(error);
                }),
            );
    }

    /*
     * Submit forgot password request
     *
     * @param {string} email
     * @returns {Observable<any>}
     */
    public requestPassword(email: string): Observable<any> {
        return this.http.post(API_AUTH_PASSWORD_RESET, {email})
            .pipe(catchError(this.handleError('forgot-password', []))
            );
    }


    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(API_USERS_URL);
    }

    getUserById(userId: number): Observable<User> {
        return this.http.get<User>(API_USERS_URL + `/${userId}`);
    }

    getUserByUsername(uname: string): Observable<User> {
        return this.http.get<any>(API_USERS_URL + `/${uname}`).pipe(
            map((response) => response.data || response)
        );
    }

    // DELETE => delete the user from the server
    deleteUser(userId: number) {
        const url = `${API_USERS_URL}/${userId}`;
        return this.http.delete(url);
    }

    // UPDATE => PUT: update the user on the server
    updateUser(_user: User): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.put(API_USERS_URL, _user, {headers: httpHeaders});
    }

    // CREATE =>  POST: add a new user to the server
    createUser(user: User): Observable<User> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<User>(API_USERS_URL, user, {headers: httpHeaders});
    }

    // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
    // items => filtered/sorted result
    findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<QueryResultsModel>(API_USERS_URL + '/findUsers', queryParams, {headers: httpHeaders});
    }

    // Permission
    getAllPermissions(): Observable<Permission[]> {
        return this.http.get<Permission[]>(API_PERMISSION_URL);
    }

    getRolePermissions(roleId: number): Observable<Permission[]> {
        return this.http.get<Permission[]>(API_PERMISSION_URL + '/getRolePermission?=' + roleId);
    }

    // Roles
    getAllRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(API_ROLES_URL);
    }

    getRoleById(roleId: number): Observable<Role> {
        return this.http.get<Role>(API_ROLES_URL + `/${roleId}`);
    }

    // CREATE =>  POST: add a new role to the server
    createRole(role: Role): Observable<Role> {
        // Note: Add headers if needed (tokens/bearer)
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<Role>(API_ROLES_URL, role, {headers: httpHeaders});
    }

    // UPDATE => PUT: update the role on the server
    updateRole(role: Role): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.put(API_ROLES_URL, role, {headers: httpHeaders});
    }

    // DELETE => delete the role from the server
    deleteRole(roleId: number): Observable<Role> {
        const url = `${API_ROLES_URL}/${roleId}`;
        return this.http.delete<Role>(url);
    }

    // Check Role Before deletion
    isRoleAssignedToUsers(roleId: number): Observable<boolean> {
        return this.http.get<boolean>(API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId);
    }

    findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
        // This code imitates server calls
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<QueryResultsModel>(API_ROLES_URL + '/findRoles', queryParams, {headers: httpHeaders});
    }

    /*
     * Handle Http operation that failed.
     * Let the app continue.
    *
    * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return throwError(result);
        };
    }
}
