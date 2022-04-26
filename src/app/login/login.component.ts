import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string | undefined;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (this.authenticationService.activeSession()) {
      this.router.navigate(['/home']);
    }
    else {
      this.authenticationService.login().subscribe(response => {
        this.authenticationService.saveToken(response.token);
        this.username = this.authenticationService.getUsername()
      });
    }
  }

  login() {
    this.router.navigate(['/home']);
  }
}
