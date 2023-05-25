import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidacionMatriculaComponent } from './validacion-matricula.component';
import { CursosCarreraComponent } from './cursos-carrera/cursos-carrera.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { EstudiantesCursoComponent } from './estudiantes-curso/estudiantes-curso.component';
import { EstudianteDetallesComponent } from './estudiantes-curso/estudiante-detalles/estudiante-detalles.component';
import { EstudiantesListaComponent } from './estudiantes-lista/estudiantes-lista.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'carreras',
    pathMatch: 'full',
  },
  {
    path: 'carreras',
    component: CarrerasComponent,
  },
  {
    path: 'delegado',
    component: ValidacionMatriculaComponent,
  },
  {
    path: 'delegado/:nombreCarrera',
    component: CursosCarreraComponent,
  },
  {
    path: 'delegado/:nombreCarrera/:nombreCurso',
    component: EstudiantesCursoComponent,
  },

  {
    path: 'delegado/:nombreCarrera/:nombreCurso/lista-estudiantes',
    component: EstudiantesListaComponent,
  },
  {
    path: 'delegado/:nombreCarrera/:nombreCurso/:idEstudiante',
    component: EstudianteDetallesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidacionMatriculaRoutingModule { }
