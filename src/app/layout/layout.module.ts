import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutRoutingModule } from './layout-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '@shared/shared.module';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';

@NgModule({
  declarations: [MainComponent, EstudiantesComponent],
  imports: [CommonModule, RouterModule, SharedModule, LayoutRoutingModule],
  exports: [MainComponent],
})
export class LayoutModule { }
