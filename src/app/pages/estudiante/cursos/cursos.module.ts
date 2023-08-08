import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { CursoPageComponent } from './curso-page/curso-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CursoCardComponent } from './curso-page/curso-card/curso-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './curso-page/search.pipe';
import { FilterFreePipe } from './curso-page/filter-free.pipe';
import { FilterNonFreePipe } from './curso-page/filter-non-free.pipe';
import { CursoDetailsComponent } from './curso-details/curso-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EstudianteCursosInscritoComponent } from './estudiante-cursos-inscrito/estudiante-cursos-inscrito.component';
import { JsonToObjectPipe } from './estudiante-cursos-inscrito/json-to-object.pipe';
import { EstudianteCursosListaComponent } from './estudiante-cursos-lista/estudiante-cursos-lista.component';
import { InscriptionFormComponent } from './inscription-form/form/inscription-form.component';
import { CmbCoursesComponent } from './inscription-form/cmb-courses/cmb-courses.component';
import { CmbPublicityComponent } from './inscription-form/cmb-publicity/cmb-publicity.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { MisCursosDetailsComponent } from './mis-cursos/mis-cursos-details/mis-cursos-details.component';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';

//Prime Ng
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    CursosComponent,
    CursoPageComponent,
    CursoCardComponent,
    SearchPipe,
    FilterFreePipe,
    FilterNonFreePipe,
    CursoDetailsComponent,
    EstudianteCursosInscritoComponent,
    JsonToObjectPipe,
    EstudianteCursosListaComponent,
    InscriptionFormComponent,
    CmbCoursesComponent,
    CmbPublicityComponent,
    MisCursosComponent,
    MisCursosDetailsComponent,
    PerfilEstudianteComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CarouselModule,
    TagModule,
    ButtonModule,
  ],
})
export class CursosModule {}
