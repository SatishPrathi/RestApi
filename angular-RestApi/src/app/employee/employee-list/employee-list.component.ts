import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
//import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      error => {
        console.error('Error loading employees', error);
      }
    );
  }

  editEmployee(empId: string): void {
    // Store employee data in localStorage or use a service
    this.employeeService.getEmployee(empId).subscribe(
      (data: Employee) => {
        // Store employee details in localStorage
        localStorage.setItem('currentEmployee', JSON.stringify(data));
        this.router.navigate(['/employee/update']); // Navigate to the update route
      },
      error => {
        console.error('Error loading employee', error);
      }
    );
  }

  deleteEmployee(empId: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(empId).subscribe(
        () => {
          alert('Employee deleted successfully');
          this.loadEmployees();
        },
        error => {
          console.error('Error deleting employee', error);
          alert('Employee deleted successfully.');
          this.loadEmployees(); // Refresh the employee list
        
        }
      );
    }
  }
}
class Employee {
  empId: string=""; // Ensure this is number if that's the expected type
  empFname?: string;
  empLname?: string;
  age?: number=0;
  address?: string;
  department?: string;
}