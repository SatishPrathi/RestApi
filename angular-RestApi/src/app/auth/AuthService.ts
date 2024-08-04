import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<string>('');
  public userRole$: Observable<string> = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // Example login implementation
    return this.http.post<any>('/api/login', { username, password });
  }

  setRole(role: string) {
    this.userRoleSubject.next(role);
  }
}
