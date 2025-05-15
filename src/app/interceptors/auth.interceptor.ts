import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: Storage) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.storage.create()).pipe(
      switchMap(() => from(this.storage.get('jwt'))),
      switchMap(token => {
        let authReq = req;
        if (token) {
          authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
        return next.handle(authReq);
      })
    );
  }
}
