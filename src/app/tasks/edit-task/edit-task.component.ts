import { TaskValidator } from './../../validators/task-validator';
import { IDelivery } from './../../models/delivery.model';
import { IUser } from './../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { ITask } from 'src/app/models/task.model';
import { DatePipe } from '@angular/common';
import { MessageBarComponent } from 'src/app/shared/message-bar/message-bar.component';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  formErrors: string[] = [] as string[];
  @ViewChild('messageBar') messageBar = {} as MessageBarComponent;
  isFormValid = false;
  today = Date.now();

  form = new FormGroup ({
    name: new FormControl('', Validators.required),
    delivery: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    plannedDate: new FormControl('', Validators.required),
    subteam: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    employees: new FormControl('', Validators.required)
  });
  users: IUser[] = [] as IUser[];
  deliveries: IDelivery[] = [] as IDelivery[];
  tasks: ITask[] = [] as ITask[];
  subteams = ['s1', 's2', 's3'];
  selectedTask: ITask | undefined;
  pipe = new DatePipe('en-US');
  deleteButtonClicked = false;

  constructor(private taskService: TaskService, private userService: UserService, private taskValidator: TaskValidator) { }

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
    this.taskService.getAllTasks().subscribe(tasks => this.tasks = tasks)
  }

  selectTask() {
    const startDate = this.pipe.transform(this.selectedTask!.startDate, "yyyy-MM-dd");
    const plannedDate = this.pipe.transform(this.selectedTask!.plannedDate, "yyyy-MM-dd");
    this.form.patchValue({
      name: this.selectedTask!.name,
      delivery: this.selectedTask!.deliveryId,
      startDate: startDate,
      plannedDate: plannedDate,
      subteam: this.selectedTask!.subteam,
      duration: this.selectedTask!.duration,
      employees: this.selectedTask!.employees
    })
  }

  formatDate(date: any) {
    let newDate = new Date(date);
    return newDate.toJSON().split('T')[0];
  }

  submit() {
    const task = {
      id: this.selectedTask?.id,
      name: this.name.value,
      deliveryId: Number(this.delivery.value) != 0 ? Number(this.delivery.value) : null,
      startDate: this.startDate.value,
      plannedDate: this.plannedDate.value,
      subteam: this.subteam.value,
      duration: this.duration.value,
      employees: this.employees.value
    } as ITask

    this.taskService.updateTask(task).subscribe(() => {
      this.messageBar.addSuccessTimeOut('Task updated successfully!');
      this.form.reset();
      this.selectedTask = undefined;
      this.loadData();
    },
    error => {
      if (error.status == 400) {
        this.messageBar.addErrorTimeOut(error.error);
      }
    });
    
  }

  deleteTask() {
    this.taskService.deleteTask(this.selectedTask?.id!).subscribe(() => {
      this.messageBar.addSuccessTimeOut('Task deleted successfully!');
      this.form.reset()
      this.selectedTask = undefined;
      this.loadData()
    });
    
  }

  validateForm(formControl: FormControl, targetInput: string): void {
    this.formErrors = this.taskValidator.validateFields(formControl, targetInput);
    this.isFormValid = this.formErrors.length == 0 && this.form.valid;
  }

  ngOnDestroy(): void {
    this.taskValidator.clearErrors();
  }
}
