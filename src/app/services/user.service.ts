import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private key = 'currentUserId';

  setUserId(id: number) {
    localStorage.setItem(this.key, id.toString());
  }
  getUserId(): number | null {
    const v = localStorage.getItem(this.key);
    return v ? +v : null;
  }
}
