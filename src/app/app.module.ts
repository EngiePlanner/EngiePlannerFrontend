import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SidebarElementComponent } from './shared/sidebar-element/sidebar-element.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WinAuthInterceptor } from './services/winAuthInterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { routes } from './app-routing.module';
import { PersonalProfileComponent } from './personal-profile/personal-profile.component';

@NgModule({
  declarations: [
    AppComponent,
      LoginComponent,
      LayoutComponent,
      HomeComponent,
      NavbarComponent,
      SidebarElementComponent,
      SidebarComponent,
      PersonalProfileComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
