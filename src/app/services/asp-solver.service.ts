import { ITask } from 'src/app/models/task.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AspSolverService {
  private url = environment.iisUrl + 'AspSolver/';
  private headers = new HttpHeaders({
    'Content-Type' : 'application/json'
  });
  private options = { headers: this.headers, withCredentials: true}

  constructor(private http: HttpClient) { }

  invokeAspSolver(tasks: ITask[]): Observable<any> {
    const body = JSON.stringify(tasks);
    return this.http.post<any>(this.url + 'InvokeAspSolver', body, this.options);
  }
}
