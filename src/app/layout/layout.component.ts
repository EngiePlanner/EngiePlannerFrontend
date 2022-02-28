import { EventEmitterService } from './../services/event-emitter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLoggedIn = false;
  isSidebarToggled = false;
  url: string | undefined;
  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    this.eventEmitterService
      .getEmitter('onRouteChanged')
      ?.subscribe(route => {
        if (route == '/') {
          this.isLoggedIn = false;
        }
        else {
          this.isLoggedIn = true;
        }
      })
  }

}
