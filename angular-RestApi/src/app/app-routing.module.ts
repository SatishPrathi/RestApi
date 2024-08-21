import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component'; // Ensure this component exists
import { AuthGuard } from './auth.guard'; // Ensure this guard exists

const routes: Routes = [
  { path: '', redirectTo: '/account/auth/login', pathMatch: 'full' },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule), canActivate: [AuthGuard] },
  { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule), canActivate: [AuthGuard] },
  { path: '**', component: Page404Component } // Ensure Page404Component exists
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
