import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  activeRequest = 0;
  constructor(private progress: NgProgress) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.activeRequest === 0) {
      this.progress.ref().start();
    }
    this.activeRequest++;
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequest--;
        if (this.activeRequest === 0) {
          this.progress.ref().complete();
        }
      })
    );
  }
}
