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
    console.log('ANTES DEL RETORNO');
    if (this.activeRequest === 0) {
      this.progress.ref().start();
    }
    this.activeRequest++;
    return next.handle(request).pipe(
      finalize(() => {
        console.log('FINALIZANDO RES PROGRESS', this.activeRequest);
        this.activeRequest--;
        if (this.activeRequest === 0) {
          this.progress.ref().complete();
        }
      })
    );
  }
}
