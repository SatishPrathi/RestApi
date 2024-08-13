import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
  employee: Employee = {
    empId: '',
    empFname: '',
    empLname: '',
    age: 0,
    address: '',
    department: ''
  };

  constructor(private employeeService: EmployeeService, private router: Router) { }

  createEmployee(): void {
    this.employeeService.createEmployee(this.employee).subscribe(
      () => this.router.navigate(['/employees']),
      (error) => console.error(error)
    );
  }
}
