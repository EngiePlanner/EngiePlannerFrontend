import { TaskService } from 'src/app/services/task.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ITask } from 'src/app/models/task.model';
import { MessageBarComponent } from 'src/app/shared/message-bar/message-bar.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-show-schedule',
  templateUrl: './show-schedule.component.html',
  styleUrls: ['./show-schedule.component.css']
})
export class ShowScheduleComponent implements OnInit {
  @Input() scheduledTasks: ITask[] = [] as ITask[];
  updatedTask: ITask | undefined;
  @ViewChild('messageBar') messageBar = {} as MessageBarComponent;
  loaded = false;

  constructor(private authenticationService: AuthenticationService, private taskService: TaskService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.authenticationService.getRole() == 'Admin') {
      this.taskService.getScheduledTasks().subscribe(tasks => {
        if (tasks) {
          this.scheduledTasks = tasks;
          this.loaded = true;
        }
        else {
          this.messageBar.addErrorTimeOut('No tasks found!');
        }
      });
    }
    else if (this.authenticationService.getRole() == 'Leader') {
      this.taskService.getScheduledTasksByOwnerUsername(this.authenticationService.getUsername()).subscribe(tasks => {
        if (tasks) {
          this.scheduledTasks = tasks;
          this.loaded = true;
        }
        else {
          this.messageBar.addErrorTimeOut('No tasks found!');
        }
      });
    } else {
      this.taskService.getScheduledTasksByResponsibleUsername(this.authenticationService.getUsername()).subscribe(tasks => {
        if (tasks) {
          this.scheduledTasks = tasks;
          this.loaded = true;
        }
        else {
          this.messageBar.addErrorTimeOut('No tasks found!');
        }
      });
    }
  }

  saveSchedule() {
    this.taskService.updateTasks(this.scheduledTasks).subscribe(() => {
      this.messageBar.addSuccessTimeOut('Schedule saved successfully!');
    },
    error => {
      if (error.status == 400) {
        this.messageBar.addErrorTimeOut(error.error);
      }
    });
  }
}
