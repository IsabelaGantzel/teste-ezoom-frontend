import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-admin-notifications',
  templateUrl: './admin-notifications.page.html',
  styleUrls: ['./admin-notifications.page.scss'],
})
export class AdminNotificationsPage {
  currentUserId!: number;
  targetUserId: number | null = null;
  title = '';
  message = '';

  constructor(
    private notifService: NotificationService,
    private storage: Storage,
    private router: Router
  ) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const role = await this.storage.get('role');
    if (role !== 'admin') {
      await this.router.navigateByUrl('/notifications');
      return;
    }
    this.currentUserId = await this.storage.get('userId');
  }

  send() {
    this.notifService.sendNotification({
      user_id: this.targetUserId!,
      title: this.title,
      message: this.message
    }).subscribe(() => {
      this.targetUserId = null,
      this.title = '';
      this.message = '';
    });
  }
}
