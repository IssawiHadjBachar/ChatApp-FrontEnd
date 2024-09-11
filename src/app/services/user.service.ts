import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: any = null;
  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  // Set the current user session
  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  // Get the current user session
  getCurrentUser() {
    return this.currentUser;
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  findByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`, { params: { username } });
  }
}

