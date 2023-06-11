import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AttendanceRegistrationComponent} from './attendance-registration/attendance-registration.component';
import {CertificatesStudentComponent} from './certificates-student/certificates-student.component';
import {RegistrationCourseComponent} from './registration-course/registration-course.component';
import {ViewAttendanceDetailsComponent} from './view-attendance-details/view-attendance-details.component';
import {CoursesComponent} from './courses/courses.component';
import {ViewCoursesParticipantComponent} from './view-courses-participant/view-courses-participant.component';
import {ViewGradesParticipantComponent} from './view-grades-participant/view-grades-participant.component';
import {
  ViewAttendancesParticipantComponent
} from './view-attendances-participant/view-attendances-participant.component';
import {RolesEnum} from '@shared/enums/roles.enum';
import {TokenGuard} from '@shared/guards/token.guard';
import {RoleGuard} from '@shared/guards/role.guard';
import {TopicCourseComponent} from "./topic-course/topic-course.component";
import { InscriptionFormComponent } from './inscription-form/form/inscription-form.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CoursesListaComponent } from './courses-list/courses-list.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: 'attendance-registration',
    component: AttendanceRegistrationComponent
  },
  {
    path: 'certificates-student',
    component: CertificatesStudentComponent
  },
  {
    path: 'registration-course/:id',
    component: RegistrationCourseComponent
  },
  {
    path: 'view-attendance-details',
    component: ViewAttendanceDetailsComponent
  },
//aa
  {
    path: 'form',
    component: InscriptionFormComponent
  },

  {
    path: 'form/:id',
    component: InscriptionFormComponent
  },

  {
    path: 'courses-list',
    component: CoursesListaComponent
  },

//a
  {
    path: 'courses',
    component: CoursesComponent,
    data: {
      roles: [RolesEnum.STUDENT]
    },
    canActivate: [TokenGuard, RoleGuard]
  },
  {
    path: 'my-courses',
    component: ViewCoursesParticipantComponent,
    data: {
      roles: [RolesEnum.STUDENT]
    },
    canActivate: [TokenGuard, RoleGuard]
  },
  {
    path: 'view-grades-participant/:id',
    component: ViewGradesParticipantComponent
  },
  {
    path: 'topic-course/:id',
    component: TopicCourseComponent
  },
  {
    path: 'view-attendances-participant/:id',
    component: ViewAttendancesParticipantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
