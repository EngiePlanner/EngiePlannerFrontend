import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.activeSession()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.getToken()}`
        }
      });
      return next.handle(request);
    }

    request = request.clone({ withCredentials: true });
    return next.handle(request);
  }
}
