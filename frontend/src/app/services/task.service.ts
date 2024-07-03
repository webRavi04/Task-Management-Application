import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`, { headers: this.getAuthHeaders() });
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`, { headers: this.getAuthHeaders() })
  }

  createTask(task: any): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task, { headers: this.getAuthHeaders() });
  }

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${id}`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`, { headers: this.getAuthHeaders() });
  }
}
