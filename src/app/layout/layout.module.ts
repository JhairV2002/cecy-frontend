import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutRoutingModule } from './layout-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, RouterModule, SharedModule, LayoutRoutingModule],
  exports: [MainComponent],
})
export class LayoutModule {}
