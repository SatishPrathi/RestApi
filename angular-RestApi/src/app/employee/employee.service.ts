import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080'; // Base URL for your backend

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/list`);
  }

  getEmployee(empId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employee/get/${empId}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/create`, employee, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Update employee using PUT or PATCH method
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/update/${employee.empId}`, employee, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteEmployee(empId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employee/delete/${empId}`);
  }
}
