import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursoPageComponent } from './curso-page/curso-page.component';
import { CursoDetailsComponent } from './curso-details/curso-details.component';
import { EstudianteCursosInscritoComponent } from './estudiante-cursos-inscrito/estudiante-cursos-inscrito.component';
import { EstudianteCursosListaComponent } from './estudiante-cursos-lista/estudiante-cursos-lista.component';
import { InscriptionFormComponent } from './inscription-form/form/inscription-form.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { MisCursosDetailsComponent } from './mis-cursos/mis-cursos-details/mis-cursos-details.component';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';
import { NotFoundComponent } from '../../core/common/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: CursosComponent,
  },
  {
    path: 'carrera/:id',
    component: CursoPageComponent,
  },
  {
    path: 'details/:id',
    component: CursoDetailsComponent,
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
    path: 'perfil',
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
export class CursosRoutingModule { }
