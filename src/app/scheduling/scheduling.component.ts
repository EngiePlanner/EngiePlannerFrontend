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

  constructor(private taskService: TaskService, private aspSolverService: AspSolverService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks
      console.log(tasks);
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
    this.aspSolverService.invokeAspSolver(this.selectedTasks).subscribe();
  }

}
