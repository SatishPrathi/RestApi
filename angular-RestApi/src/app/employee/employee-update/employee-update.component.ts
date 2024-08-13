import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  id!: number;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadEmployee();
  }

  loadEmployee(): void {
    this.employeeService.getEmployee(this.id).subscribe(
      (data: Employee) => this.employee = data,
      (error) => console.error(error)
    );
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      () => this.router.navigate(['/employees']),
      (error) => console.error(error)
    );
  }
}
