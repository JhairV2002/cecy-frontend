import { Component } from '@angular/core';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'cecy-frontend';
  progressRef: NgProgressRef | undefined;
  constructor(private ngProgress: NgProgress) {}
  startProgress() {
    this.progressRef = this.ngProgress.ref();
    this.progressRef.start();
  }
  completeProgress() {
    this.progressRef = this.ngProgress.ref();
    this.progressRef.complete();
  }
}
