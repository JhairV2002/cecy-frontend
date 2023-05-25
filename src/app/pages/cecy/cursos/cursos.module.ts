import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { CursoPageComponent } from './curso-page/curso-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CursoCardComponent } from './curso-page/curso-card/curso-card.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './curso-page/search.pipe';
import { FilterFreePipe } from './curso-page/filter-free.pipe';
import { FilterNonFreePipe } from './curso-page/filter-non-free.pipe';
import { CursoDetailsComponent } from './curso-details/curso-details.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    CursosComponent,
    CursoPageComponent,
    CursoCardComponent,
    SearchPipe,
    FilterFreePipe,
    FilterNonFreePipe,
    CursoDetailsComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
  ],
})
export class CursosModule {}
