import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from 'src/app/services/notification.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: Notification[] = [];
  userId!: number;
  isAdmin = false;

  constructor(
    private notifService: NotificationService,
    private authService: AuthService,
    private storage: Storage,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.userId = await this.storage.get('userId');

    const role = await this.storage.get('role');
    this.isAdmin = role === 'admin';

    this.loadNotifications();
  }

  loadNotifications() {
    this.notifService.listNotifications(this.userId)
      .subscribe(res => {
        this.notifications = res.data.map(n => ({
          ...n,
          is_read: Number((n as any).is_read) === 1
        }));
      });
  }

  markRead(n: Notification, event: MouseEvent) {
    event.stopPropagation();
    this.notifService.markAsRead(n.id)
      .subscribe(() => n.is_read = true);
  }

  onNotificationClick(n: Notification) {
    if (!n.is_read) {
      this.notifService.markAsRead(n.id)
        .subscribe(() => n.is_read = true);
    }
  }

  goToCreateNotification() {
    this.router.navigate(['/admin-notifications']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
