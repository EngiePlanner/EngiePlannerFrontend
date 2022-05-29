import { AuthenticationService } from './../../services/authentication.service';
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
  selectedPredecessors: number[] | undefined;

  constructor(private taskService: TaskService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.authenticationService.getRole() == 'Admin') {
      this.taskService.getAllTasks().subscribe(tasks => {
        if (tasks) {
          this.tasks = tasks;
        }
        else {
          this.messageBar.addErrorTimeOut('No tasks found!')
        }
      });
    }
    else {
      this.taskService.getTasksByOwnerUsername(this.authenticationService.getUsername()).subscribe(tasks => {
        if (tasks) {
          this.tasks = tasks;
        }
        else {
          this.messageBar.addErrorTimeOut('No tasks found!')
        }
      });
    }
  }

  selectTask() {
    if (this.authenticationService.getRole() == 'Admin') {
      this.taskService.getTasksWithPlannedDateLowerThanGivenDate(this.selectedTask?.plannedDate!)
        .subscribe(tasks => {
          this.potentialPredecessors = tasks;
          this.selectedPredecessors = this.selectedTask?.predecessors!.map(({id}) => id! );
        });
    }
    else {
      this.taskService.getTasksByOwnerUsernameWithPlannedDateLowerThanGivenDate(this.selectedTask?.ownerUsername!, this.selectedTask?.plannedDate!)
        .subscribe(tasks => {
          this.potentialPredecessors = tasks;
          this.selectedPredecessors = this.selectedTask?.predecessors!.map(({id}) => id! );
        });
    }
  }

  submit() {
    this.taskService.addPredecessors(this.selectedTask?.id!, this.selectedPredecessors!).subscribe(response => {
      this.messageBar.addSuccessTimeOut('Predecessors added successfully!');
      this.selectedTask = undefined;
      this.selectedPredecessors = undefined;
      this.potentialPredecessors = [];
      this.loadData();
    },
    error => {
      this.messageBar.addErrorTimeOut('Error in adding predecessors!')
    });
  }

  customSearch(term: string, item: ITask) {
    term = term.toLocaleLowerCase();
    return item.name.toLocaleLowerCase().indexOf(term) > -1;
  }
}
