import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Import the LoginComponent
import { WelcomeComponent } from './welcome/welcome.component'; // Import the WelcomeComponent
import { AuthGuard } from './auth.guard'; // Ensure this guard exists

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'login', component: LoginComponent }, // Login page route
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] }, // Welcome page for authenticated users
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule), canActivate: [AuthGuard] },
  { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule), canActivate: [AuthGuard] },
  //{ path: '**', component: Page404Component } // Ensure Page404Component exists
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
