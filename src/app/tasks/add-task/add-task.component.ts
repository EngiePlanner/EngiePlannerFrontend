import { IDelivery } from './../../models/delivery.model';
import { ITask } from './../../models/task.model';
import { IUser } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  form = new FormGroup ({
    name: new FormControl(''),
    delivery: new FormControl(''),
    startDate: new FormControl(''),
    plannedDate: new FormControl(''),
    subteam: new FormControl(''),
    duration: new FormControl(''),
    employees: new FormControl('')
  });
  users: IUser[] = [] as IUser[];
  deliveries: IDelivery[] = [] as IDelivery[];
  subteams = ['s1', 's2', 's3'];

  constructor(private taskService: TaskService, private userService: UserService) { }

  get name(): FormControl {
    return this.form.get('name') as FormControl
  }

  get delivery(): FormControl {
    return this.form.get('delivery') as FormControl
  }

  get startDate(): FormControl {
    return this.form.get('startDate') as FormControl
  }

  get plannedDate(): FormControl {
    return this.form.get('plannedDate') as FormControl
  }

  get subteam(): FormControl {
    return this.form.get('subteam') as FormControl
  }

  get duration(): FormControl {
    return this.form.get('duration') as FormControl
  }

  get employees(): FormControl {
    return this.form.get('employees') as FormControl
  }

  ngOnInit() {
    this.loadData()
  }

  private loadData(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users) 
    this.taskService.getAllDeliveries().subscribe(deliveries => this.deliveries = deliveries)
  }

  submit() {
    const employeesArray = [];
    employeesArray.push(this.employees.value)
    const task = {
      name: this.name.value,
      deliveryId: Number(this.delivery.value) != 0 ? Number(this.delivery.value) : null,
      startDate: this.startDate.value,
      plannedDate: this.plannedDate.value,
      subteam: this.subteam.value,
      duration: this.duration.value,
      employees: employeesArray
    } as ITask

    this.taskService.createTask(task).subscribe();
    this.form.reset();
  }
}
