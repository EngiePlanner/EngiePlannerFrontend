import { Observable } from 'rxjs';
import { IAvailability } from './../models/availability.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { IWeek } from '../models/week.model';

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

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url + 'GetAllUsers', this.options);
  }

  getUsersByLeaderGroup(leaderUsername: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url + 'GetUsersByLeaderGroup?leaderUsername=' + leaderUsername, this.options);
  }

  getAllWeeksFromCurrentYear(): Observable<IWeek[]> {
    return this.http.get<IWeek[]>(this.url + 'GettAllWeeksFromCurrentYear', this.options);
  }

  getAvailabilityByFromDateAndUserUsername(fromDate: Date, userUsername: string): Observable<IAvailability> {
    return this.http.get<IAvailability>(this.url + 'GetAvailabilityByFromDateAndUserUsername?fromDate=' + fromDate + '&userUsername=' + userUsername);
  }

  createAvailability(availability: IAvailability): Observable<IAvailability> {
    const body = JSON.stringify(availability);
    return this.http.post<IAvailability>(this.url + 'CreateAvailability', body, this.options);
  }

  updateAvailability(availability: IAvailability): Observable<IAvailability> {
    const body = JSON.stringify(availability);
    return this.http.put<IAvailability>(this.url + 'UpdateAvailability', body, this.options);
  }
}
