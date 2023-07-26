import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Prime Ng
import { SecretaryCecyCertificateRoutingModule } from './secretary-cecy-certificate-routing.module';
import { PanelCursoComponent } from './list-course/panel-curso.component';
import { CardModule } from 'primeng/card';
import { SearchCursoComponent } from './search-curso/search-curso.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [PanelCursoComponent, SearchCursoComponent],
  imports: [
    CommonModule,
    CardModule,
    SecretaryCecyCertificateRoutingModule,
    TagModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
  ],
})
export class SecretaryCecyCertificateModule {}
