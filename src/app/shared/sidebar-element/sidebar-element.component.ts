import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-element',
  templateUrl: './sidebar-element.component.html',
  styleUrls: ['./sidebar-element.component.css']
})
export class SidebarElementComponent {
  @Input() Title = '';
  @Input() IconClass = '';
  @Input() Route = '';
  @Input() isSidebarActive = false;

  constructor() { }

}
