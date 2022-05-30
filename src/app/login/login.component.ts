import { LoadingScreenService } from './../services/loading-screen.service';
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
  constructor(private authenticationService: AuthenticationService, private router: Router, private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
    if (this.authenticationService.activeSession()) {
      this.router.navigate(['/home']);
    }
    else {
      this.loadingScreenService.showLoader()
      this.authenticationService.login().subscribe(response => {
        this.authenticationService.saveToken(response.token);
        this.username = this.authenticationService.getUsername();
        this.loadingScreenService.hideLoader();
      });
    }
  }

  login() {
    this.router.navigate(['/home']);
  }
}
