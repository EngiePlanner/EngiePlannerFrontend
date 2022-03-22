import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ITask } from 'src/app/models/task.model';
import { MessageBarComponent } from 'src/app/shared/message-bar/message-bar.component';

@Component({
  selector: 'app-predecessors',
  templateUrl: './predecessors.component.html',
  styleUrls: ['./predecessors.component.css']
})
export class PredecessorsComponent implements OnInit {
  formErrors: string[] = [] as string[];
  @ViewChild('messageBar') messageBar = {} as MessageBarComponent;

  tasks: ITask[] = [] as ITask[];
  potentialPredecessors: ITask[] = [] as ITask[];
  selectedTask: ITask | undefined;
  selectedPredecessors: ITask[] = [] as ITask[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.taskService.getAllTasks().subscribe(tasks => {
      if (tasks) {
        this.tasks = tasks;
      }
      else {
        this.messageBar.addErrorTimeOut('No tasks found!')
      }
    })
  }

  submit() {
    
  }

  selectTask() {
    this.taskService.getTasksWithPlannedDateLowerThanGivenDate(this.selectedTask?.plannedDate!)
      .subscribe(tasks => this.potentialPredecessors = tasks);
  }

  onChange() {
    console.log(this.selectedPredecessors)
  }
}
