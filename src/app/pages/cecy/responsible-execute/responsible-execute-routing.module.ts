import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ListadoFechaComponent } from './asistencia/listado-fecha/listado-fecha.component';
import { CursoComponent } from './curso/curso.component';
import { EstudiantesComponent } from './notas/estudiantes.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mis-cursos', component: CursoComponent },
  { path: 'notas', component: EstudiantesComponent },
  { path: '', component: AsistenciaComponent },
  { path: 'listadofecha', component: ListadoFechaComponent },
  //{ path: 'course-form', component: CourseFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsibleExecuteRoutingModule {}
