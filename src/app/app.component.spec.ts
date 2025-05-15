import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule],
  selector: 'app-root',
  template: '<ion-router-outlet></ion-router-outlet>',
})
export class AppComponent {}