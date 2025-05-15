import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private baseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  listNotifications(userId: number): Observable<{ data: Notification[] }> {
    return this.http.get<{ data: Notification[] }>(`${this.baseUrl}/notifications/${userId}`);
  }

  markAsRead(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/notifications/mark-as-read/${id}`, {});
  }

  sendNotification(body: { user_id: number; title: string; message: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/notifications`, body);
  }
}