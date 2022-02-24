import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string | undefined;
  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.login().subscribe(response => {
      this.authenticationService.saveToken(response.token);
      this.username = this.authenticationService.getUsername()
    });
  }

  logIn() {
    //localStorage.setItem('loggedUser', this.NTUser);
    //this.router.navigate(['/home']);
}

}
