import { LoadingScreenService } from './../../services/loading-screen.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AspSolverService } from '../../services/asp-solver.service';
import { TaskService } from 'src/app/services/task.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITask } from '../../models/task.model';
import { MessageBarComponent } from '../../shared/message-bar/message-bar.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  tasks: ITask[] = [] as ITask[];
  @Input() scheduledTasks: ITask[] = [] as ITask[];
  updatedTask: ITask | undefined;
  selectedTasks: ITask[] = [] as ITask[];
  isMasterSel = false;
  isDisabled = true;
  isScheduled = false;
  tasksFound = true;
  @ViewChild('messageBar') messageBar = {} as MessageBarComponent;

  constructor(private taskService: TaskService,
    private aspSolverService: AspSolverService,
    private authenticationService: AuthenticationService,
    private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
    this.loadData();
    this.getCheckedItemList();
    this.getScheduledTasks();
  }

  loadData(): void {
    if (this.authenticationService.getRole() == 'Admin') {
      this.taskService.getUnscheduledTasks().subscribe(tasks => {
        if (tasks) {
          this.tasks = tasks
          this.tasksFound = true;
        }
        else {
          this.tasksFound = false;
        }
      });
    }
    else {
      this.taskService.getUnscheduledTasksByOwnerUsername(this.authenticationService.getUsername()).subscribe(tasks => {
        if (tasks) {
          this.tasks = tasks
        }
        else {
          this.tasksFound = false;
        }
      });
    }
  }

  onCheckboxClick(task: ITask, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedTasks.push(task)
    }
    else {
      const index: number = this.selectedTasks.indexOf(task);
      this.selectedTasks.splice(index, 1);
    }
  }

  schedule() {
    this.loadingScreenService.showLoader();
    this.aspSolverService.invokeAspSolver(this.selectedTasks).subscribe(response => {
      this.scheduledTasks.push(...response);
      this.messageBar.addSuccessTimeOut('Tasks scheduled successfully!');
      this.isScheduled = true;
      this.loadingScreenService.hideLoader();
    },
    _ => {
      this.messageBar.addErrorTimeOut('Error on scheduling tasks!')
      this.loadingScreenService.hideLoader();
    });

  }

  getScheduledTasks() {
    if (this.authenticationService.getRole() == 'Admin') {
      this.taskService.getScheduledTasks().subscribe(tasks => {
        if (tasks) {
          this.scheduledTasks = tasks;
        }
      });
    }
    else  {
      this.taskService.getScheduledTasksByOwnerUsername(this.authenticationService.getUsername()).subscribe(tasks => {
        if (tasks) {
          this.scheduledTasks = tasks;
        }
      });
    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.tasks.length; i++) {
      this.tasks[i].isSelected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.tasks.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.selectedTasks = [];
    for (var i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].isSelected) {
        this.selectedTasks.push(this.tasks[i]);
      }
    }
    if (this.selectedTasks.length == 0) {
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
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
