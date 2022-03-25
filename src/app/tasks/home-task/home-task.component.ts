import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-task',
  templateUrl: './home-task.component.html',
  styleUrls: ['./home-task.component.css']
})
export class HomeTaskComponent {
  optionMenu: string = 'AddTask';
  constructor() { }
}
