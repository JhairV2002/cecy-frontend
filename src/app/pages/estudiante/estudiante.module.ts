import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CursoCardComponent } from './curso-page/curso-card/curso-card.component';
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
import { WebsiteModule } from '../website/website.module';
import { SharedModule } from '@shared/shared.module';

import { CursoPageComponent } from './curso-page/curso-page.component';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { ToolbarModule } from 'primeng/toolbar';



//Prime Ng
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LearningComponent } from './learning/learning.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    EstudianteCursosInscritoComponent,
    JsonToObjectPipe,
    EstudianteCursosListaComponent,
    InscriptionFormComponent,
    CmbCoursesComponent,
    CmbPublicityComponent,
    MisCursosComponent,
    MisCursosDetailsComponent,
    PerfilEstudianteComponent,
    LearningComponent,
    CursoPageComponent,
    CursoCardComponent,
    SearchPipe,
    FilterFreePipe,
    FilterNonFreePipe,
    CursoDetailsComponent,
    HomeComponent,
  ],
  exports: [
    CursoDetailsComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    CardModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextareaModule,
    DropdownModule,
    PasswordModule,
    CalendarModule,
    InputTextModule,
    MessagesModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    MatTabsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    WebsiteModule,
    ToolbarModule
  ],
})
export class EstudianteModule { }
