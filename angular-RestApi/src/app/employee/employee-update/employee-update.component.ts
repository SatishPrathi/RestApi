import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../rest/rest.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
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

  updateEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.restService.genericRestService(JSON.stringify(this.employee), `api/employees/${id}`).subscribe(
      () => this.router.navigate(['/employee-list']),
      error => console.error('Error updating employee', error)
    );
  }
}
