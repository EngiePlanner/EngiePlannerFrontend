import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = environment.iisUrl + 'task/';
  private headers = new HttpHeaders({
    'Content-Type' : 'application/json'
  });
  private options = { headers: this.headers, withCredentials: true}

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + 'GetAllTasks');
  }

}
