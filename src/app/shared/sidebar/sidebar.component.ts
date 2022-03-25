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
      },
      {
        Title: 'Availability',
        IconClass: 'a-icon boschicon-bosch-ic-calendar-clock icon-availability',
        Route: '/availability'
      },
    ]

    if (this.autenticationService.getRole() != 'Associate') {
      this.sidebarElements.push(
        {
          Title: 'Tasks',
          IconClass: 'a-icon icon-tasks',
          Route: '/tasks'
        },
        {
          Title: 'Schedule',
          IconClass: 'a-icon boschicon-bosch-ic-timeline-settings icon-schedule',
          Route: '/schedule'
        },
      );
    }
  }

  closeButtonClicked(): void {
    this.closeSidebarButton.emit();
    this.isSidebarActive = !this.isSidebarActive;
}

}
