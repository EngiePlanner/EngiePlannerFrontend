import { Observable } from 'rxjs';
import { IAvailability } from './../models/availability.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.iisUrl + 'user/';
  private headers = new HttpHeaders({
    'Content-Type' : 'application/json'
  });
  private options = { headers: this.headers, withCredentials: true}

  constructor(private http: HttpClient) { }

  createAvailability(availability: IAvailability): Observable<IAvailability> {
    const body = JSON.stringify(availability);
    return this.http.post<IAvailability>(this.url, body, this.options);
  }
}
