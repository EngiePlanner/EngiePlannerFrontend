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

  getTasksByOwnerUsername(ownerUsername: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + 'GetTasksByOwnerUsername?ownerUsername=' + ownerUsername);
  }

  getTasksWithPlannedDateLowerThanGivenDate(date: Date): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + 'GetTasksWithPlannedDateLowerThanGivenDate?date=' + date);
  }

  getTasksByOwnerUsernameWithPlannedDateLowerThanGivenDate(ownerUsername: string, date: Date): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + 'GetTasksByOwnerUsernameWithPlannedDateLowerThanGivenDate?ownerUsername=' + ownerUsername + '&date=' + date);
  }

  getUnscheduledTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + 'GetUnscheduledTasks');
  }

  getUnscheduledTasksByOwnerUsername(ownerUsername: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + 'GetUnscheduledTasksByOwnerUsername?ownerUsername=' + ownerUsername);
  }

  getScheduledTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + 'GetScheduledTasks');
  }

  getScheduledTasksByOwnerUsername(ownerUsername: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + 'GetScheduledTasksByOwnerUsername?ownerUsername=' + ownerUsername);
  }

  getScheduledTasksByResponsibleUsername(responsibleUsername: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + 'GetScheduledTasksByResponsibleUsername?responsibleUsername=' + responsibleUsername);
  }

  createTask(task: ITask): Observable<ITask> {
    const body = JSON.stringify(task);
    return this.http.post<ITask>(this.url + 'CreateTask', body, this.options);
  }

  updateTask(task: ITask): Observable<ITask> {
    const body = JSON.stringify(task);
    return this.http.put<ITask>(this.url + 'UpdateTask', body, this.options);
  }

  updateTasks(tasks: ITask[]): Observable<ITask[]> {
    const body = JSON.stringify(tasks);
    return this.http.put<ITask[]>(this.url + 'UpdateTasksAfterSchedule', body, this.options);
  }

  addPredecessors(taskId: number, predecessorsId: number[]): Observable<any> {
    const body = JSON.stringify(predecessorsId);
    return this.http.put<any>(this.url + 'AddPredecessors?taskId=' + taskId, body, this.options);
  }

  deleteTask(taskId: number): Observable<ITask> {
    return this.http.delete<ITask>(this.url + 'DeleteTask?taskId=' + taskId);
  }

  createPdf(tasks: ITask[]): Observable<any> {
    const header = new HttpHeaders({
      Accept: 'application/pdf',
      'Content-Type': 'application/json',
      responseType: 'blob',
    });

    const body = JSON.stringify(tasks);
    return this.http.post<any>(
      this.url + 'CreateScheduledTasksPdf', body, { headers: header, responseType: 'blob' as 'json' }
    );
  }
}
