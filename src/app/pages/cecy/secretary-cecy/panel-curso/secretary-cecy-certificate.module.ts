import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretaryCecyCertificateRoutingModule } from './secretary-cecy-certificate-routing.module';
import { PanelCursoComponent } from './list-course/panel-curso.component';
import { CardModule } from 'primeng/card';
import { SearchCursoComponent } from './search-curso/search-curso.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    PanelCursoComponent,
    SearchCursoComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    SecretaryCecyCertificateRoutingModule,
    TagModule,
    TableModule,
    ButtonModule
  ]
})
export class SecretaryCecyCertificateModule { }
