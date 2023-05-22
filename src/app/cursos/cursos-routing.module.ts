import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursoPageComponent } from './curso-page/curso-page.component';
import { CursoDetailsComponent } from './curso-details/curso-details.component';

const routes: Routes = [
  {
    path: '',
    component: CursosComponent,
    children: [
      {
        path: 'carrera/:nombreCarrera',
        component: CursoPageComponent,
      },
      {
        path: 'details/:nombreCurso',
        component: CursoDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
