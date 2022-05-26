import { RoleType } from './../enums/role-type.enum';
import { IUser } from './../models/user.model';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = environment.iisUrl + 'authentication/';
  token: string = '';

  constructor(
    private http: HttpClient
  ) { }

  login() : Observable<any> {
    const headerDict = {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin':'http://EngiePlannerAPI.com/authentication/login'
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(this.url + 'login', requestOptions);
  }

  public saveToken(newToken: string): void {
    sessionStorage.removeItem(this.token);
    sessionStorage.setItem("Token", newToken);
  }

  getToken(): string | null {
    return sessionStorage.getItem('Token');
  }

  getDecodedToken(): any {
    return jwtDecode(this.getToken()!);
  }

  getUsername() {
    return this.getDecodedToken().Username;
  }

  getRole() {
    return this.getDecodedToken().Role
  }

  activeSession(): boolean {
    return this.getToken() != null;
  }

  getLoggedUser(): IUser {
    const decodedToken = this.getDecodedToken();
    const user = {
      username: decodedToken.Username,
      departments: decodedToken.Departments,
      groups: decodedToken.Groups,
      name: decodedToken.Name,
      displayName: decodedToken.DisplayName,
      email: decodedToken.Email,
      roleType: decodedToken.Role,
      leaderUsername: decodedToken.LeaderUsername,
      leaderName: decodedToken.LeaderName
    } as IUser

    return user;
  }
}
