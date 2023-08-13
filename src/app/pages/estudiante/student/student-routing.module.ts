import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesStudentComponent } from './certificates-student/certificates-student.component';
import { InscriptionFormComponent } from './inscription-form/form/inscription-form.component';
import { NotFoundComponent } from '../../core/common/not-found/not-found.component';
import { CoursesListaComponent } from './courses-list/courses-list.component';

const routes: Routes = [
  {
    path: 'certificates-student',
    component: CertificatesStudentComponent,
  },
  {
    path: 'form',
    component: InscriptionFormComponent,
  },
  {
    path: 'form/:id',
    component: InscriptionFormComponent,
  },
  {
    path: 'courses-list',
    component: CoursesListaComponent,
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
export class StudentRoutingModule { }
