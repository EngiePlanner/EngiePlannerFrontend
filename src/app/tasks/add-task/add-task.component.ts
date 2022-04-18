import { AuthenticationService } from './../../services/authentication.service';
import { TaskValidator } from './../../validators/task-validator';
import { ITask } from './../../models/task.model';
import { IUser } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { TaskService } from './../../services/task.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageBarComponent } from 'src/app/shared/message-bar/message-bar.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  formErrors: string[] = [] as string[];
  @ViewChild('messageBar') messageBar = {} as MessageBarComponent;
  isFormValid = false;
  today = Date.now();

  form = new FormGroup ({
    name: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    plannedDate: new FormControl('', Validators.required),
    subteam: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required),
  });
  users: IUser[] = [] as IUser[];
  availableTasks: ITask[] = [] as ITask[];
  subteams = ['s1', 's2', 's3'];

  constructor(private taskService: TaskService, private userService: UserService, private taskValidator: TaskValidator, private authenticationService: AuthenticationService) { }

  get name(): FormControl {
    return this.form.get('name') as FormControl
  }

  get availabilityDate(): FormControl {
    return this.form.get('availabilityDate') as FormControl
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

  get employee(): FormControl {
    return this.form.get('employee') as FormControl
  }

  ngOnInit() {
    this.loadData()
  }

  private loadData(): void {
    if (this.authenticationService.getRole() == 'Admin') {
      this.userService.getAllUsers().subscribe(users => {
        if (users) {
          this.users = users
        }
        else {
          this.messageBar.addErrorTimeOut('No employees found!')
        }
      });
    }
    else {
      this.userService.getUsersByLeaderGroup(this.authenticationService.getUsername()).subscribe(users => {
        if (users) {
          this.users = users
        }
        else {
          this.messageBar.addErrorTimeOut('No employees found!')
        }
      });
    }
  }

  submit() {
    const task = {
      name: this.name.value,
      availabilityDate: this.availabilityDate.value,
      plannedDate: this.plannedDate.value,
      subteam: this.subteam.value,
      duration: this.duration.value,
      responsibleUsername: this.employee.value,
      ownerUsername: this.authenticationService.getUsername()
    } as ITask

    this.taskService.createTask(task).subscribe(() => {
      this.messageBar.addSuccessTimeOut('Task added successfully!');
      this.form.reset();
      this.isFormValid = false;
    },
    error => {
      if (error.status == 400) {
        this.messageBar.addErrorTimeOut(error.error);
      }
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
