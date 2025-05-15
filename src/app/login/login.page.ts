import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  isLoading = false;

  constructor(
    private auth: AuthService,
    private storage: Storage,
    private router: Router
  ) {}

  async login() {
    this.isLoading = true;
    try {
      const res = await this.auth.login({ email: this.email, password: this.password }).toPromise();
      if (res?.token && res.user?.id && res.user?.role) {
        await this.storage.create();
        await this.storage.set('jwt', res.token);
        await this.storage.set('userId', res.user.id);
        await this.storage.set('role', res.user.role);
        await this.router.navigateByUrl('/notifications');
      }
    } catch (err) {
      console.error('Login error', err);
    } finally {
      this.isLoading = false;
    }
  }
}