import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080'; // Base URL for your backend

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/list`);
  }

  getEmployee(empId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employee/get/${empId}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/create`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/save`, employee, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteEmployee(empId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employee/delete/${empId}`);
  }

  // Encode the ID (this could be a simple Base64 encoding or any other encoding mechanism)
  encodeId(id: string): string {
    return btoa(id); // Base64 encoding as an example
  }

  // Decode the ID
  decodeId(encodedId: string): string {
    return atob(encodedId); // Base64 decoding as an example
  }
}
