import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    IonicModule,
    RouterModule
  ],
  selector: 'app-root',
  template: '<ion-router-outlet></ion-router-outlet>',
})
export class AppComponent {}