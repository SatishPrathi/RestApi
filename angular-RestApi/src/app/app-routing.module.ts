import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee/employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './employee/employee-delete/employee-delete.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },

  // Employee Routes
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employee-create', component: EmployeeCreateComponent, canActivate: [AuthGuard] },
  { path: 'employee-update/:id', component: EmployeeUpdateComponent, canActivate: [AuthGuard] },
  { path: 'employee-delete/:id', component: EmployeeDeleteComponent, canActivate: [AuthGuard] },

  // Product Routes
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'product-create', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'product-update/:id', component: ProductUpdateComponent, canActivate: [AuthGuard] },
  { path: 'product-delete/:id', component: ProductDeleteComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
