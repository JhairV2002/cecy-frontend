import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ListadoFechaComponent } from './asistencia/listado-fecha/listado-fecha.component';

const routes: Routes = [
  { path: '', component: AsistenciaComponent },
  { path: 'listadofecha', component: ListadoFechaComponent },
  // { path: 'course-form', component: CourseFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsibleExecuteRoutingModule { }
