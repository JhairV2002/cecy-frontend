import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { PoaFormComponent } from './poa/poa-form/poa-form.component';
import { HomeComponent } from './home/home.component';
import { TabsComponent } from '../responsible-course/tabs/tabs.component';
import { SchoolYearComponent } from './school-year/school-year.component';
import { AssistantComponent } from './assistant/assistant.component';
import { ChangePasswordComponent } from '@shared/components/user/change-password/change-password.component';
import { PlanificationComponent } from './planification/planification.component';
import { SignatureComponent } from './signature/signature.component';
import { SignatureFormComponent } from './signature/signature-form/signature-form.component';
import { CarrerasComponent } from '../assistant/carreras/carreras.component';
import { ReporteComponent } from '../assistant/reporte/reporte.component';
import { ReporteListaComponent } from '../assistant/reporte/reporte-lista/reporte-lista.component';
import { CursosCarreraComponent } from '../assistant/cursos-carrera/cursos-carrera.component';
import { EstudiantesCursoComponent } from '../assistant/estudiantes-curso/estudiantes-curso.component';
import { EstudianteDetallesComponent } from '../assistant/estudiantes-curso/estudiante-detalles/estudiante-detalles.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'course', component: CourseComponent },
  { path: 'course/visualization/:id', component: TabsComponent },
  { path: 'signature', component: SignatureComponent },
  { path: 'signature/create', component: SignatureFormComponent },
  { path: 'signature/edit/:id', component: SignatureFormComponent },
  { path: 'assistant', component: AssistantComponent },
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
    path: 'matricula/career/:careerId/:nombre-carrera/course/:idCurso/student/:idEstudiante',
    component: EstudianteDetallesComponent,
  },
  {
    path: 'certificado',
    loadChildren: () =>
      import('./../assistant/panel-curso/secretary-cecy-certificate.module').then((m) => m.SecretaryCecyCertificateModule),
  },
  { path: 'reporte', component: ReporteComponent },
  { path: 'reporte-lista/:id', component: ReporteListaComponent },
  { path: 'school-year', component: SchoolYearComponent },
  { path: 'poa-form', component: PoaFormComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'planification/:id', component: PlanificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoordinatorCecyRoutingModule { }
