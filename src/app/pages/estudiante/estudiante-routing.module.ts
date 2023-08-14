import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoPageComponent } from './curso-page/curso-page.component';
import { CursoDetailsComponent } from './curso-details/curso-details.component';
import { EstudianteCursosInscritoComponent } from './estudiante-cursos-inscrito/estudiante-cursos-inscrito.component';
import { EstudianteCursosListaComponent } from './estudiante-cursos-lista/estudiante-cursos-lista.component';
import { InscriptionFormComponent } from './inscription-form/form/inscription-form.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { MisCursosDetailsComponent } from './mis-cursos/mis-cursos-details/mis-cursos-details.component';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';
import { NotFoundComponent } from '../core/common/not-found/not-found.component';
import { CoursesComponent } from '../website/courses/courses.component';
import { CoursesCareerComponent } from '../website/courses-career/courses-career.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/career/:idCareer', component: CoursesCareerComponent },
  { path: 'careers', component: CoursesComponent },
  {
    path: 'course/:id/details',
    component: CursoDetailsComponent,
  },
  {
    path: 'carrera/:id',
    component: CursoPageComponent,
  },
  {
    path: 'estudiante/:estudianteId',
    component: EstudianteCursosInscritoComponent,
  },
  {
    path: 'estudiante/cursos-lista/:estudianteId',
    component: EstudianteCursosListaComponent,
  },
  {
    path: 'formInscription/:id',
    component: InscriptionFormComponent,
  },
  {
    path: 'mis-cursos',
    component: MisCursosComponent,
  },
  {
    path: 'mis-cursos/details',
    component: MisCursosDetailsComponent,
  },
  {
    path: 'profile',
    component: PerfilEstudianteComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteRoutingModule { }
