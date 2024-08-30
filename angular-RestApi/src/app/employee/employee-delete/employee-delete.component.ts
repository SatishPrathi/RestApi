import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  empId: string = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const encodedId = this.route.snapshot.paramMap.get('id')!;
    this.empId = this.employeeService.decodeId(encodedId);

    if (this.empId) {
      this.employeeService.getEmployee(this.empId).subscribe(
        employee => {
          console.log('Employee details fetched:', employee);
        },
        error => {
          console.error('Error fetching employee details', error);
        }
      );
    }
  }

  deleteEmployee(): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.empId).subscribe(
        () => {
          this.router.navigate(['/employee']);
        },
        error => {
          console.error('Error deleting employee', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/employee']);
  }
}
