import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistantRoutingModule } from './assistant-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@shared/shared.module';

import { EstudiantesCursoComponent } from './estudiantes-curso/estudiantes-curso.component';
import { EstudiantesTableComponent } from './estudiantes-curso/estudiantes-table/estudiantes-table.component';
import { CursoBannerComponent } from './estudiantes-curso/curso-banner/curso-banner.component';
import { EstudianteDetallesComponent } from './estudiantes-curso/estudiante-detalles/estudiante-detalles.component';
import { EstudiantesListaComponent } from './estudiantes-lista/estudiantes-lista.component';
import { CursosCarreraComponent } from './cursos-carrera/cursos-carrera.component';
import { CarrerasComponent } from '../assistant/carreras/carreras.component';
import { SearchEstudiantesPipe } from './pipes/search-estudiantes.pipe';

//PrimeNg
import { FormsModule } from '@angular/forms';
import { ReporteComponent } from './reporte/reporte.component';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ReporteListaComponent } from './reporte/reporte-lista/reporte-lista.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChartModule } from 'primeng/chart';
import { StyleClassModule } from 'primeng/styleclass';
import { SkeletonModule } from 'primeng/skeleton';
import { DataViewModule } from 'primeng/dataview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TagModule } from 'primeng/tag';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Components
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CoursesFormComponent } from './courses/courses-form/courses-form.component';
import { SearchComponent } from './courses/search/search.component';

@NgModule({
  declarations: [
    HomeComponent,
    ReporteListaComponent,
    ReporteComponent,
    CoursesComponent,
    CoursesListComponent,
    CoursesFormComponent,
    SearchComponent,
    EstudiantesCursoComponent,
    EstudiantesTableComponent,
    CursoBannerComponent,
    EstudiantesTableComponent,
    CursoBannerComponent,
    EstudianteDetallesComponent,
    EstudiantesListaComponent,
    SearchEstudiantesPipe,
    CursosCarreraComponent,
    CarrerasComponent,
  ],
  exports: [
    CarrerasComponent,
    ReporteComponent,
    ReporteListaComponent,
    CursosCarreraComponent,
    EstudiantesCursoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AssistantRoutingModule,
    SharedModule,
    PaginatorModule,
    CardModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
    DialogModule,
    ChartModule,
    StyleClassModule,
    SkeletonModule,
    DataViewModule,
    BreadcrumbModule,
    TagModule,
    SplitButtonModule,
    CheckboxModule,
    ProgressSpinnerModule,
  ],
})
export class AssistantModule { }
