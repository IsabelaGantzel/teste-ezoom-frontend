import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from 'src/app/services/notification.service';
import { Storage } from '@ionic/storage-angular';

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

  constructor(
    private notifService: NotificationService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.userId = await this.storage.get('userId');
    this.loadNotifications();
  }

  loadNotifications() {
    this.notifService.listNotifications(this.userId).subscribe(res => {
      this.notifications = res.data;
    });
  }

  markRead(n: Notification) {
    this.notifService.markAsRead(n.id).subscribe(() => {
      n.is_read = true;
    });
  }
}