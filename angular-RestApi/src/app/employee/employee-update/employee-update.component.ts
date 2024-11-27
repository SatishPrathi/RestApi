import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  employee: Employee = {
    empId: '',
    empFname: '',
    empLname: '',
    age: 0,
    address: '',
    department: ''
  };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the employee data stored in localStorage
    const storedEmployee = JSON.parse(localStorage.getItem('currentEmployee') || '{}');
    if (storedEmployee && storedEmployee.empId) {
      this.employee = storedEmployee;  // Use the stored employee details
    } else {
      this.errorMessage = 'Employee data is missing';
    }
  }

  updateEmployee(employeeForm: NgForm): void {
    if (employeeForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly';
      return;
    }

    this.isLoading = true;
    this.employeeService.updateEmployee(this.employee).subscribe(
      (updatedEmployee: Employee) => {
        alert('Employee updated successfully');
        this.router.navigate(['/employee/list']);  // Navigate back after success
        this.isLoading = false;
      },
      error => {
        console.error('Error updating employee:', error);
        this.errorMessage = 'Error updating employee';
        this.isLoading = false;
      }
    );
  }
}
