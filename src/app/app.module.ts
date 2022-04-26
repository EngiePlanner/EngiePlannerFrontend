import { JwtInterceptor } from './services/jwtInterceptor';
import { LoadingScreenComponent } from './shared/loading-screen/loading-screen.component';
import { GanttChartComponent } from './scheduling/gantt-chart/gantt-chart.component';
import { ShowScheduleComponent } from './scheduling/show-schedule/show-schedule.component';
import { PredecessorsComponent } from './tasks/predecessors/predecessors.component';
import { RoleGuard } from './guards/role.guard';
import { MessageBarComponent } from './shared/message-bar/message-bar.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { HomeTaskComponent } from './tasks/home-task/home-task.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SidebarElementComponent } from './shared/sidebar-element/sidebar-element.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { routes } from './app-routing.module';
import { PersonalProfileComponent } from './personal-profile/personal-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvailabilityComponent } from './availability/availability.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ScheduleComponent } from './scheduling/schedule/schedule.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
      LoginComponent,
      LayoutComponent,
      HomeComponent,
      NavbarComponent,
      SidebarElementComponent,
      SidebarComponent,
      PersonalProfileComponent,
      HomeTaskComponent,
      AddTaskComponent,
      EditTaskComponent,
      MessageBarComponent,
      AvailabilityComponent,
      ScheduleComponent,
      PredecessorsComponent,
      ShowScheduleComponent,
      GanttChartComponent,
      LoadingScreenComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
