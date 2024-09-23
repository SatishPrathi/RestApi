import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

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

  // Navigate to the employee update form for editing (No encoding, using empId directly)
  editEmployee(empId: number): void {
    this.router.navigate([`/employee/update/${empId}`]);
  }

  // Delete the employee (No encoding, using empId directly)
  deleteEmployee(empId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(empId).subscribe(
        () => {
          this.employees = this.employees.filter(employee => employee.empId !== empId);
          alert('Employee deleted successfully');
        },
        error => {
          console.error('Error deleting employee', error);
        }
      );
    }
  }
}
