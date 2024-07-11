import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-list/employee.service';
import { AuthService } from '../auth.service';
import { Employee } from '../employee-list/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = false;
  error = '';

  constructor(private employeeService: EmployeeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.loading = true;
    const token = this.authService.getToken();
    if (token) {
      this.employeeService.getEmployees(token).subscribe(
        employees => {
          this.employees = employees;
          this.loading = false;
        },
        error => {
          console.error('Error fetching employees', error);
          this.error = 'Error fetching employees. Please try again later.';
          this.loading = false;
        }
      );
    } else {
      console.error('No token found. Please login first.');
      this.loading = false;
      this.error = 'No token found. Please login first.';
    }
  }

  logout(): void {
    this.authService.logout();
    // Optional: Redirect to login page or perform other actions after logout
  }
}
