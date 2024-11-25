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
    empId: "", 
    empFname: '',
    empLname: '',
    age: 0,
    address: '',
    department: ''
  };
  successMessage: string = ''; // Success message placeholder
  errorMessage: string = ''; // Error message placeholder
  isLoading: boolean = false; // Show loading spinner if required

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    // Initialization logic
  }

  createEmployee(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    this.employeeService.createEmployee(this.employee).subscribe(
      () => {
        this.successMessage = 'Employee successfully created!';
        this.resetForm(); // Optional: Clear the form after creation
        this.isLoading = false;
      },
      error => {
        this.errorMessage = 'Error creating employee. Please try again.';
        console.error('Error creating employee', error);
        this.isLoading = false;
      }
    );
  }

  private resetForm(): void {
    this.employee = {
      empId: "",
      empFname: '',
      empLname: '',
      age: 0,
      address: '',
      department: ''
    };
  }
}
