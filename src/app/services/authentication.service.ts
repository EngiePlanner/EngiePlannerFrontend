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
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
      withCredentials: true,
      responseType: 'text',
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

  activeSession(): boolean {
    return this.getToken() != null;
  }
}
