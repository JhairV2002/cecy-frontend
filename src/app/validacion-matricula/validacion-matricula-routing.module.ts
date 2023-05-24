import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidacionMatriculaComponent } from './validacion-matricula.component';
import { CursosCarreraComponent } from './cursos-carrera/cursos-carrera.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { EstudiantesCursoComponent } from './estudiantes-curso/estudiantes-curso.component';
import { EstudianteDetallesComponent } from './estudiantes-curso/estudiante-detalles/estudiante-detalles.component';

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
    children: [
      {
        path: ':nombreCarrera',
        component: CursosCarreraComponent,
        children: [
          {
            path: ':nombreCurso',
            component: EstudiantesCursoComponent,
            children: [
              { path: ':idEstudiante', component: EstudianteDetallesComponent },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidacionMatriculaRoutingModule {}
