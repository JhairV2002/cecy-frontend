import { Component, Inject } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-image-modal',
  template: `
    <img [src]="imageUrl" alt="Evidencia Fotográfica" style="width: 100%;">
  `
})
export class ImageModalComponent {
  imageUrl: string;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.imageUrl = this.config.data.imageUrl;
  }
}
