import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseUrl = 'http://localhost:8080/api';  // Base URL for your backend API

  constructor(private http: HttpClient) {}

  genericRestService(body: any, endpoint: string, method: string = 'POST'): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    switch (method.toUpperCase()) {
      case 'GET':
        return this.http.get(url);
      case 'POST':
        return this.http.post(url, body, { headers });
      case 'PUT':
        return this.http.put(url, body, { headers });
      case 'DELETE':
        return this.http.delete(url);
      default:
        throw new Error('Invalid HTTP method');
    }
  }
}
