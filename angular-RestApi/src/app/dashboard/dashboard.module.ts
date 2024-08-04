import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    OwnerDashboardComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserDashboardComponent,
    OwnerDashboardComponent,
    AdminDashboardComponent
  ]
})
export class DashboardModule { }
