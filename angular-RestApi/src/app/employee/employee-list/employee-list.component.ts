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
  employee:  Employee[] ; 
  emp: Employee= new Employee;

  constructor(private employeeService: EmployeeService, private router: Router ) {
    this.employee=[];
  //emp=new Employee();
}


  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employee = data;
        console.log("employees:"+this.employee)
      },
      error => {
        console.error('Error loading employees', error);
      }
    );
    this.router.navigate([`/employee/list`]);

  }

  // Navigate to the employee update form for editing (No encoding, using empId directly)
  editEmployee(empId: number): void {
    this.employeeService.getEmployee(empId).subscribe(
      (data: Employee) => {
        this.emp = data;
      },
      error => {
        console.error('Error loading employees', error);
      }
    );
    this.router.navigate([`/employee/update/${empId}`]);
  }

  // Delete the employee (No encoding, using empId directly)
  deleteEmployee(empId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(empId).subscribe(
        () => {
          this.employee = this.employee.filter(employee => employee.empId !== empId);
          alert('Employee deleted successfully');
        },
        error => {
          console.error('Error deleting employee', error);
        }
      );
    }
  }
}


 class Employee {
  empId: number=0; // Ensure this is number if that's the expected type
  empFname?: string;
  empLname?: string;
  age?: number=0;
  address?: string;
  department?: string;
}
