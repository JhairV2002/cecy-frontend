import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidacionMatriculaRoutingModule } from './validacion-matricula-routing.module';
import { ValidacionMatriculaComponent } from './validacion-matricula.component';
import { HttpClientModule } from '@angular/common/http';
import { CursosCarreraComponent } from './cursos-carrera/cursos-carrera.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { EstudiantesCursoComponent } from './estudiantes-curso/estudiantes-curso.component';
import { EstudiantesTableComponent } from './estudiantes-curso/estudiantes-table/estudiantes-table.component';
import { CursoBannerComponent } from './estudiantes-curso/curso-banner/curso-banner.component';
import { EstudianteDetallesComponent } from './estudiantes-curso/estudiante-detalles/estudiante-detalles.component';

@NgModule({
  declarations: [
    ValidacionMatriculaComponent,
    CursosCarreraComponent,
    CarrerasComponent,
    EstudiantesCursoComponent,
    EstudiantesTableComponent,
    CursoBannerComponent,
    EstudianteDetallesComponent,
  ],
  imports: [CommonModule, ValidacionMatriculaRoutingModule, HttpClientModule],
})
export class ValidacionMatriculaModule {}
