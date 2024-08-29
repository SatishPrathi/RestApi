import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  employee: any = {};

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(+id!).subscribe(
      data => this.employee = data,
      error => console.error('Error fetching employee', error)
    );
  }

  deleteEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.deleteEmployee(+id!).subscribe(
      () => this.router.navigate(['/employee']),
      error => console.error('Error deleting employee', error)
    );
  }
}
