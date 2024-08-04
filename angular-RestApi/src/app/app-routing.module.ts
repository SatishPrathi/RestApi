import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { OwnerDashboardComponent } from './dashboard/owner-dashboard/owner-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import {AuthService } from './auth/AuthService';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthService] },
  { path: 'owner-dashboard', component: OwnerDashboardComponent, canActivate: [AuthService] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
