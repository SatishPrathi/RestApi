import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component'; // Import Delete Component

const routes: Routes = [
  {
    path: 'employees',
    children: [
      { path: '', component: EmployeeListComponent }, // List employees
      { path: 'create', component: EmployeeCreateComponent }, // Create employee
      { path: 'update/:id', component: EmployeeUpdateComponent }, // Update employee
      { path: 'delete/:id', component: EmployeeDeleteComponent }, // Delete employee
      { path: 'list', component: EmployeeListComponent } // List employees
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
