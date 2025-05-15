import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  { path: 'notifications', loadComponent: () => import('./notifications/notifications.page').then(m => m.NotificationsPage), canActivate: [AuthGuard] },
  { path: 'admin-notifications', loadComponent: () => import('./admin-notifications/admin-notifications.page').then(m => m.AdminNotificationsPage), canActivate: [AuthGuard, AdminGuard]},
  { path: '**', redirectTo: '/login' }
];