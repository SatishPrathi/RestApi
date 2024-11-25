import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employee: Employee = {
    empId: "", // Initialize as a number
    empFname: '',
    empLname: '',
    age: 0,
    address: '',
    department: ''
  };

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    // Initialization logic
  }

  createEmployee(): void {
    this.employeeService.createEmployee(this.employee).subscribe(
      () => {
        // Handle successful creation
      },
      error => {
        console.error('Error creating employee', error);
      }
    );
  }
}
