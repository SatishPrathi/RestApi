import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  employee: Employee = {
    empId: "",
    empFname: '',
    empLname: '',
    age: 0,
    address: '',
    department: ''
  };
  errorMessage: string = '';
  isLoading: boolean = false;
  empId:string = "";

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract empId from URL]

    this.empId = this.route.snapshot.params['empId'] // Use 'empId' as defined in routes
    if (!this.empId) {
      this.errorMessage = 'Invalid Employee ID';
      return;
    }
    // Fetch employee details
    this.fetchEmployee(this.empId);
  }

  private fetchEmployee(empId: string): void {
    this.isLoading = true;
    this.employeeService.getEmployee(empId).subscribe(
      (employee: Employee) => {
        if (employee) {
          this.employee = employee; // Update employee data
        } else {
          this.errorMessage = 'Employee not found';
        }
        this.isLoading = false;
      },
      error => {
        this.errorMessage = 'Error fetching employee details';
        this.isLoading = false;
      }
    );
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
        this.router.navigate(['/employee/list']); // Navigate back after success
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
