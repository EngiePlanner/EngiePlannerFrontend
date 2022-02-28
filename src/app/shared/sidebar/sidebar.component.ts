import { AuthenticationService } from './../../services/authentication.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ISidebarItem } from '../sidebar-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebarElements: ISidebarItem[] = [] as ISidebarItem[];
  isSidebarActive = false;
  loggedUserUsername: string | undefined;
  @Output() closeSidebarButton = new EventEmitter<void>();
  constructor(private autenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loggedUserUsername = this.autenticationService.getUsername()
    this.sidebarElements = [
      {
        Title: 'Home',
        IconClass: 'a-icon icon-home',
        Route: '/home'
      }
    ]
  }

  closeButtonClicked(): void {
    this.closeSidebarButton.emit();
    this.isSidebarActive = !this.isSidebarActive;
}

}