import { Component, OnInit } from '@angular/core';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {
  showLoader = true;

  constructor(private loadingScreenService: LoadingScreenService) {}

  ngOnInit(): void {
      this.loadingScreenService.loaderSubject.subscribe(
          (value) => (this.showLoader = value)
      );
  }

}
