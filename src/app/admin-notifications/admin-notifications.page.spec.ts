import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNotificationsPage } from './admin-notifications.page';

describe('AdminNotificationPage', () => {
  let component: AdminNotificationsPage;
  let fixture: ComponentFixture<AdminNotificationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
