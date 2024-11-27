import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';

const routes: Routes = [
  {
    path: 'employee',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' }, // Default redirect to employee/list
      { path: 'list', component: EmployeeListComponent }, // List employees
      { path: 'create', component: EmployeeCreateComponent }, // Create employee
      { path: 'update', component: EmployeeUpdateComponent }, // Update employee (no empId in URL)
      { path: 'delete/:empId', component: EmployeeDeleteComponent } // Delete employee by empId
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
