import { TaskService } from './../services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(tasks => console.log(tasks));
  }

}
