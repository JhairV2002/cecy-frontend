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
  //Validacion matricula
  { path: 'matricula', component: CarrerasComponent },
  {
    path: 'matricula/career/:careerId',
    component: CursosCarreraComponent,
  },
  {
    path: 'matricula/career/:careerId/:nombre-carrera/course/:idCurso',
    component: EstudiantesCursoComponent,
  },
  {
    path: 'career/:nombreCarrera/:nombreCurso/lista-estudiantes',
    component: EstudiantesListaComponent,
  },
  {
    path: 'matricula/career/:careerId/:nombre-carrera/course/:idCurso/student/:idEstudiante',
    component: EstudianteDetallesComponent,
  },
  {
    path: 'certificado',
    loadChildren: () =>
      import('./panel-curso/secretary-cecy-certificate.module').then(
        (m) => m.SecretaryCecyCertificateModule
      ),
  },
  { path: 'reporte', component: ReporteComponent },
  { path: 'reporte-lista/:id', component: ReporteListaComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistantRoutingModule { }
