import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = JSON.stringify({ username, password });

    return this.http.post<any>(this.loginUrl, body, { headers }).pipe(
      tap(response => {
        const token = response.access_token;
        if (token) {
          localStorage.setItem('token', token);
          const userDetails = {
            role: response.roles[0], // Adjust based on your response structure
            userName: response.username
          };
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
          this.redirectUser(response.roles[0]);
        } else {
          console.error('Token not found in response', response);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserDetails(): any {
    return JSON.parse(localStorage.getItem('userDetails') || '{}');
  }

  private redirectUser(role: string): void {
    if (role === "ROLE_EMPLOYEE") {
      this.router.navigate(['/employees']);
    } else if (role === "PRODUCT_OWNER" || role === "PRODUCT_ADMIN") {
      this.router.navigate(['/products']);
    } else {
      this.router.navigate(['/login']); // Default case
    }
  }
}
