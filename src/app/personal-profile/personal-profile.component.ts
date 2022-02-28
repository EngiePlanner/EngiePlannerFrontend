import { Component, OnInit } from '@angular/core';
import { RoleType } from '../enums/role-type.enum';
import { IUser } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.css']
})
export class PersonalProfileComponent implements OnInit {
  user: IUser = {} as IUser;

  constructor(
      private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.user = this.authenticationService.getLoggedUser();  
  }
}
