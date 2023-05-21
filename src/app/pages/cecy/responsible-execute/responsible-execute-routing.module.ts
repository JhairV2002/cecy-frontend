import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ListadoFechaComponent } from './asistencia/listado-fecha/listado-fecha.component';
import { CursoComponent } from './curso/curso.component';

const routes: Routes = [
  {
    path: 'curso', component:CursoComponent,

  },
  { path: '', component: AsistenciaComponent },
  { path: 'listadofecha', component: ListadoFechaComponent },
  //{ path: 'course-form', component: CourseFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsibleExecuteRoutingModule { }
