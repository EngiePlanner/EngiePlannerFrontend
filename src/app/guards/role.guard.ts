import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
      private authenticationService: AuthenticationService,
      private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data.expectedRoles;

    if (this.authenticationService.activeSession() &&
        expectedRoles.some((x: string) => this.authenticationService.getRole() == x)) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
    }
}
