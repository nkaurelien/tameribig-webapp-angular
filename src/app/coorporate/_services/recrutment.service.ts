import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecrutmentService {

  constructor(private http: HttpClient) { }

  sendMessage(values) {
    return this.http.post<any>('RouteRecrutment', values);

  }
}
