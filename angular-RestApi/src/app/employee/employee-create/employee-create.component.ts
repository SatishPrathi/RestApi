import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../rest/rest.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
  employee: any = {};

  constructor(private restService: RestService, private router: Router) {}

  createEmployee(): void {
    this.restService.genericRestService(JSON.stringify(this.employee), 'api/employees').subscribe(
      () => this.router.navigate(['/employee-list']),
      error => console.error('Error creating employee', error)
    );
  }
}
