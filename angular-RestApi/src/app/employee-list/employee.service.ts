import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee-list/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = 'http://localhost:8080//Employee/list';

  constructor(private http: HttpClient) { }

  getEmployees(token: string): Observable<Employee[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Employee[]>(this.employeesUrl, { headers });
  }
}
