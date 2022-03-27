import { MessageBarComponent } from './../shared/message-bar/message-bar.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './../services/authentication.service';
import { IWeek } from './../models/week.model';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IAvailability } from '../models/availability.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  @ViewChild('messageBar') messageBar = {} as MessageBarComponent;
  weeks: IWeek[] = [] as IWeek[];
  availableWeeks: IWeek[] = [] as IWeek[];
  availability: IAvailability | undefined;
  pipe = new DatePipe('en-US');
  currentWeekNumber: number | undefined;

  form = new FormGroup ({
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    availableHours: new FormControl('', Validators.required),
  });

  get fromDate(): FormControl {
    return this.form.get('fromDate') as FormControl
  }

  get toDate(): FormControl {
    return this.form.get('toDate') as FormControl
  }

  get availableHours(): FormControl {
    return this.form.get('availableHours') as FormControl
  }

  constructor(private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userService.getAllWeeksFromCurrentYear().subscribe(weeks => {
      if (weeks) {
        this.weeks = weeks;
        this.currentWeekNumber = this.getWeekNumber();
        this.availableWeeks = this.weeks.filter(x => x.number >= this.currentWeekNumber!);
      }
      else {
        this.messageBar.addErrorTimeOut('No weeks found!');
      }
    })
  }

  getWeekNumber(): number {
    let now = new Date();
    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    return week;
  }

  onWeekClick(week: IWeek): void {
    this.userService.getAvailabilityByFromDateAndUserUsername(week.firstDay, this.authenticationService.getUsername()).subscribe(availability => {
      if (availability) {
        this.availability = availability;
        const fromDate = this.pipe.transform(this.availability.fromDate, "yyyy-MM-dd");
        const toDate = this.pipe.transform(this.availability.toDate, "yyyy-MM-dd");
        this.form.patchValue({
          fromDate: fromDate,
          toDate: toDate,
          availableHours: this.availability.availableHours
        });
      }
      else {
        this.messageBar.addErrorTimeOut('Availability not found!');
      }
    })
  }

  update(): void {
    const availability = {
      id: this.availability?.id,
      userUsername: this.authenticationService.getUsername(),
      fromDate: this.fromDate.value,
      toDate: this.toDate.value,
      availableHours: this.availableHours.value
    } as IAvailability

    this.userService.updateAvailability(availability).subscribe(() => {
      this.messageBar.addSuccessTimeOut('Availability updated successfully!');
      this.form.reset();
      this.loadData();
    },
    error => {
      if (error.status == 400) {
        this.messageBar.addErrorTimeOut(error.error);
      }
    });
  }
}
