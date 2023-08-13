import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesStudentComponent } from './certificates-student/certificates-student.component';
import { RolesEnum } from '@shared/enums/roles.enum';
import { TokenGuard } from '@shared/guards/token.guard';
import { RoleGuard } from '@shared/guards/role.guard';
import { InscriptionFormComponent } from './inscription-form/form/inscription-form.component';
import { NotFoundComponent } from '../../core/common/not-found/not-found.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  // },
  // {
  //   path: 'attendance-registration',
  //   component: ViewAttendanceDetailsComponent,
  // },
  // {
  //   path: 'certificates-student',
  //   component: CertificatesStudentComponent,
  // },
  // {
  //   path: 'view-attendance-details',
  //   component: ViewAttendanceDetailsComponent,
  // },
  //aa
  // {
  //   path: 'form',
  //   component: InscriptionFormComponent,
  // },

  // {
  //   path: 'form/:id',
  //   component: InscriptionFormComponent,
  // },

  // {
  //   path: 'courses-list',
  //   component: CoursesListaComponent,
  // },

  //a
  // {
  //   path: 'courses',
  //   component: CoursesComponent,
  // data: {
  //   roles: [RolesEnum.STUDENT],
  // },
  // canActivate: [TokenGuard, RoleGuard],
  // },
  // {
  //   path: 'topic-course/:id',
  //   component: TopicCourseComponent,
  // },
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
export class StudentRoutingModule {}
