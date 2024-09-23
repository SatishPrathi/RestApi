import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth.guard'; // Ensure this guard is correctly implemented
// import { Page404Component } from './page404/page404.component'; // Make sure this exists

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect root to login
  { path: 'login', component: LoginComponent }, // Login page route
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] }, // Welcome page for authenticated users
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  // Add wildcard route for 404 - page not found
  // { path: '**', component: Page404Component } // Uncomment this when the Page404Component is created
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
