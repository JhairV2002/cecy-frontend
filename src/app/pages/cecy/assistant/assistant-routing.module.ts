import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReporteListaComponent } from './reporte/reporte-lista/reporte-lista.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ChangePasswordComponent } from '@shared/components/user/change-password/change-password.component';
import { CoursesComponent } from './courses/courses.component';
import { TabsComponent } from '../responsible-course/tabs/tabs.component';

import { CursosCarreraComponent } from './cursos-carrera/cursos-carrera.component';
import { CarrerasComponent } from '../assistant/carreras/carreras.component';
import { EstudiantesCursoComponent } from './estudiantes-curso/estudiantes-curso.component';
import { EstudianteDetallesComponent } from './estudiantes-curso/estudiante-detalles/estudiante-detalles.component';
import { EstudiantesListaComponent } from './estudiantes-lista/estudiantes-lista.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/visualization/:id', component: TabsComponent },
  { path: 'enrollment-record', component: CarrerasComponent },
  //Validacion matricula

  { path: 'carreras', component: CarrerasComponent },
  // {
  //   path: 'delegado',
  //   component: ValidacionMatriculaComponent,
  // },
  { path: 'delegado/:id', component: CursosCarreraComponent },
  {
    path: 'delegado/:nombreCarrera/:idCurso',
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
  {
    path: 'certificado',
    loadChildren: () =>
      import('./panel-curso/secretary-cecy-certificate.module').then(
        (m) => m.SecretaryCecyCertificateModule
      ),
  },
  { path: 'reporte-lista/:id', component: ReporteListaComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: 'reporte-lista/:id', component: ReporteListaComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'reporte', component: ReporteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistantRoutingModule {}
