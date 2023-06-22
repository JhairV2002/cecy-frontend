import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretaryCecyCertificateRoutingModule } from './secretary-cecy-certificate-routing.module';
import { PanelCursoComponent } from './list-course/panel-curso.component';
import { CardModule } from 'primeng/card';
import { SearchCursoComponent } from './search-curso/search-curso.component';



@NgModule({
  declarations: [
    PanelCursoComponent,
    SearchCursoComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    SecretaryCecyCertificateRoutingModule
  ]
})
export class SecretaryCecyCertificateModule { }
