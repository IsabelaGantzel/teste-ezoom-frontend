import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  { path: 'notifications', loadComponent: () => import('./notifications/notifications.page').then(m => m.NotificationsPage) },
  { path: 'admin-notifications', loadComponent: () => import('./admin-notifications/admin-notifications.page').then(m => m.AdminNotificationsPage) },
];