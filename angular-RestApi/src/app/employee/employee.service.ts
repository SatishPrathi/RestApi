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

  // Fetch list of employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/list`);
  }

  // Fetch employee by ID
  getEmployee(empId: string): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Employee>(`${this.apiUrl}/employee/get`, { empId }, { headers });
  }

  // Create a new employee
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/create`, employee, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Update an existing employee
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/update`, employee, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }  

   // Delete employee by ID
   deleteEmployee(empId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employee/delete/${empId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}