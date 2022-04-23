import { ShowScheduleComponent } from './scheduling/show-schedule/show-schedule.component';
import { RoleGuard } from './guards/role.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ScheduleComponent } from './scheduling/schedule/schedule.component';
import { AvailabilityComponent } from './availability/availability.component';
import { HomeTaskComponent } from './tasks/home-task/home-task.component';
import { PersonalProfileComponent } from './personal-profile/personal-profile.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'profile',
    component: PersonalProfileComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'tasks',
    component: HomeTaskComponent,
    canActivate: [AuthenticationGuard, RoleGuard],
    data: {
      expectedRoles: ['Admin', 'Leader']
    }
  },
  {
    path: 'availability',
    component: AvailabilityComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [AuthenticationGuard, RoleGuard],
    data: {
      expectedRoles: ['Admin', 'Leader']
    }
  },
  {
    path: 'show-schedule',
    component: ShowScheduleComponent,
    canActivate: [AuthenticationGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
