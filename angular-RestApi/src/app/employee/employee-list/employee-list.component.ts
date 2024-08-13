import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => this.employees = data,
      (error) => console.error(error)
    );
  }

  deleteEmployee(id: number): void {
    if (id !== undefined) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => this.loadEmployees(),
        (error) => console.error(error)
      );
    } else {
      console.error('Employee ID is undefined');
    }
  }
}
