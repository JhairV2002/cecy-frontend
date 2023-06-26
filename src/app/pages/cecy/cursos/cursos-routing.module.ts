import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursoPageComponent } from './curso-page/curso-page.component';
import { CursoDetailsComponent } from './curso-details/curso-details.component';
import { EstudianteCursosInscritoComponent } from './estudiante-cursos-inscrito/estudiante-cursos-inscrito.component';
import { EstudianteCursosListaComponent } from './estudiante-cursos-lista/estudiante-cursos-lista.component';
import { FormularioRegistroComponent } from './formulario-registro/formulario-registro.component';
import { FormularioInicioSesionComponent } from './formulario-inicio-sesion/formulario-inicio-sesion.component';

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
    path: 'registro',
    component: FormularioRegistroComponent,
  },
  {
    path: 'login',
    component: FormularioInicioSesionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule { }
