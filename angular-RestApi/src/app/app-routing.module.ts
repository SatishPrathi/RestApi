import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthGuard } from './auth.guard'; // Add this if you have an AuthGuard
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employee-list', component: EmployeeListComponent }, // Use AuthGuard if required
  { path: 'welcome', component: WelcomeComponent }, // Use AuthGuard if required
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
