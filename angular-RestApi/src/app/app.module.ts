// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EmployeeListComponent } from './employee-list/employee-list.component'; // Import EmployeeListComponent
import { AuthGuard } from './auth.guard'; // Import AuthGuard if necessary

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    EmployeeListComponent // Add EmployeeListComponent here
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule here
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard // Provide AuthGuard if necessary
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
