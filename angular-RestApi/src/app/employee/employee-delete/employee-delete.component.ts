import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../rest/rest.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  employee: any = {};

  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.restService.genericRestService('', `api/employees/${id}`).subscribe(
      data => this.employee = data,
      error => console.error('Error fetching employee', error)
    );
  }

  deleteEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.restService.genericRestService('', `api/employees/${id}`).subscribe(
      () => this.router.navigate(['/employee-list']),
      error => console.error('Error deleting employee', error)
    );
  }
}
