import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ListadofechaComponent } from './asistencia/listadofecha/listadofecha.component';
import { RegistrofotograficoComponent } from './asistencia/registrofotografico/registrofotografico.component';
import { CursoComponent } from './curso/curso.component';

const routes: Routes = [
  {
    path: 'students-list',
    loadChildren: () =>
      import('./feature/list/students-list/students-list.module').then(
        (m) => m.StudentsListModule
      ),
  },
  {path: 'curso', component:CursoComponent},
  {path: 'asistencia', component:AsistenciaComponent},
  {path: 'listadofecha', component:ListadofechaComponent},
  {path: 'registrofotografico', component:RegistrofotograficoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
