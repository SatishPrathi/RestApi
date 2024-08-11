// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest/rest.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.restService.genericRestService('', 'api/employees').subscribe(
      data => this.employees = data,
      error => console.error('Error fetching employees', error)
    );
  }
}
