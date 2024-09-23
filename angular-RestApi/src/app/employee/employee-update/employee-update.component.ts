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
    empId: 0,
    empFname: '',
    empLname: '',
    age: 0,
    address: '',
    department: ''
  };

  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const empId = +this.route.snapshot.paramMap.get('id')!; // Parse ID from the URL
    if (empId) {
      this.employeeService.getEmployee(empId).subscribe(
        (employee: Employee) => {
          this.employee = employee;
        },
        error => {
          console.error('Error fetching employee details:', error);
          this.errorMessage = 'Error fetching employee details';
        }
      );
    }
  }

  updateEmployee(employeeForm: NgForm): void {
    if (employeeForm.valid) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => {
          alert('Employee updated successfully');
          this.router.navigate(['/employee/list']); // Redirect to employee list after success
        },
        error => {
          console.error('Error updating employee:', error);
          this.errorMessage = 'Error updating employee';
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
