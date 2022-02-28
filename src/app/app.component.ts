import { EventEmitterService } from './services/event-emitter.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EngiePlannerFrontend';

  constructor(private router: Router, private eventEmitterSerive: EventEmitterService) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        eventEmitterSerive.getEmitter('onRouteChanged')?.emit(event.url)
      }
    })
  }
}
