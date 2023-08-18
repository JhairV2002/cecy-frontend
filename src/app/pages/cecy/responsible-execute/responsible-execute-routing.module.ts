import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { FechaComponent } from './asistencia/fecha/fecha.component';
import { CursoComponent } from './curso/curso.component';
import { EstudiantesComponent } from './notas/estudiantes.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from '@shared/components/user/change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'my-courses', component: CursoComponent },
  { path: 'course/:courseId/notes/students', component: EstudiantesComponent },
  {
    path: 'course/:courseId/attendance/:asistenciaId',
    component: AsistenciaComponent,
  },
  { path: 'course/:courseId/date-list', component: FechaComponent },
  { path: 'course/:courseId/create', component: AsistenciaComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsibleExecuteRoutingModule {}
