import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  empId!: number;
  employee!: Employee;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the empId from the route and convert it to a number
    const encodedId = this.route.snapshot.paramMap.get('id');
    if (encodedId) {
      this.empId = +encodedId;  // Convert string to number using +
    }

    // Fetch the employee details using the empId
    this.employeeService.getEmployee(this.empId).subscribe(
      (employee: Employee) => {
        this.employee = employee;
      },
      error => {
        console.error('Error fetching employee details', error);
      }
    );
  }

  deleteEmployee(): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.empId).subscribe(
        () => {
          alert('Employee deleted successfully');
          this.router.navigate(['/employee/list']);  // Redirect to the employee list
        },
        error => {
          console.error('Error deleting employee', error);
        }
      );
    }
  }

  // Add the cancel method
  cancel(): void {
    this.router.navigate(['/employee/list']);  // Navigate back to employee list
  }
}
