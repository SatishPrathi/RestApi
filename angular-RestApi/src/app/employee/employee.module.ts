import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component'; // Make sure this is imported
import { EmployeeRoutingModule } from './employee-routing.module';

// PrimeNG modules
import { TableModule } from 'primeng/table'; // Import PrimeNG Table module
import { ButtonModule } from 'primeng/button'; // Import PrimeNG Button module

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeUpdateComponent,
    EmployeeDeleteComponent // Ensure this component is declared
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeRoutingModule,
    TableModule, // Add PrimeNG Table module
    ButtonModule // Add PrimeNG Button module
  ]
})
export class EmployeeModule { }
