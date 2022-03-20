import { AspSolverService } from './../services/asp-solver.service';
import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit } from '@angular/core';
import { ITask } from '../models/task.model';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {
  tasks: ITask[] = [] as ITask[];
  selectedTasks: ITask[] = [] as ITask[];
  isMasterSel = false;

  constructor(private taskService: TaskService, private aspSolverService: AspSolverService) { }

  ngOnInit() {
    this.loadData();
    this.getCheckedItemList();
  }

  loadData(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks
    });
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
    console.log(this.selectedTasks);
    //this.aspSolverService.invokeAspSolver(this.selectedTasks).subscribe();
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
      if(this.tasks[i].isSelected)
      this.selectedTasks.push(this.tasks[i]);
    }
  }
}
