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
    empId: 0,
    empFname: '',
    empLname: '',
    age: 0,
    address: '',
    department: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const encodedId = this.route.snapshot.paramMap.get('id')!;
    const empId = this.employeeService.decodeId(encodedId);

    if (empId) {
      this.employeeService.getEmployee(empId).subscribe(
        (employee: Employee) => {
          this.employee = employee;
        },
        /*error => {
          console.error('Error fetching employee details', error);
        }*/
      );
    }
  }

  updateEmployee(form: any): void {
    if (form.valid) {
      console.log('Employee data before update:', this.employee);  // Log the data being sent
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.router.navigate(['/employee/list']); // Redirect to employee list after successful update
        },
        /*error => {
          console.error('Error updating employee', error);
        }*/
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
