import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesEnum } from '@shared/enums/roles.enum';
//import { TokenGuard } from '@shared/guards/token.guard';
import { DashboardComponent } from './coordinator-career/dashboard/dashboard.component';
import { AuthGuard } from './../../guards/auth.guard';
import { RoleGuard } from './../../guards/role.guard';

import { MainComponent } from '@layout/main/main.component';
import { HasRoleGuard } from 'src/app/guards/has-role.guard';
import { HasTokenGuard } from 'src/app/guards/has-token.guard';
import { EstudiantesComponent } from '@layout/estudiantes/estudiantes.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'coordinator-career',
        // canLoad: [],
        // data: {
        //   allowedRoles: ['coordinator_career', 'admin'],
        // },
        loadChildren: () =>
          import('./coordinator-career/coordinator-career.module').then(
            (m) => m.CoordinatorCareerModule
          ),
      },
      {
        path: 'coordinator-cecy',
        canActivate: [],
        // canLoad: [],
        // data: {
        //   allowedRoles: ['coordinator_cecy', 'admin'],
        // },
        loadChildren: () =>
          import('./coordinator-cecy/coordinator-cecy.module').then(
            (m) => m.CoordinatorCecyModule
          ),
        /* data: {
          roles: [RolesEnum.ADMIN, RolesEnum.COORDINATOR_CECY],
        },
        canActivate: [TokenGuard, RoleGuard], */
      },
      {
        path: 'coordinator-cecy',
        data: {
          allowedRoles: ['coordinator_cecy', 'admin'],
        },
        loadChildren: () =>
          import('./coordinator-cecy/coordinator-cecy.module').then(
            (m) => m.CoordinatorCecyModule
          ),
        /* data: {
          roles: [RolesEnum.ADMIN, RolesEnum.COORDINATOR_CECY],
        },
        canActivate: [TokenGuard, RoleGuard], */
      },
      {
        path: 'instructor',
        data: {
          allowedRoles: ['instructor', 'admin'],
        },
        loadChildren: () =>
          import('./instructor/instructor.module').then(
            (m) => m.InstructorModule
          ),
        /* data: {
          roles: [RolesEnum.ADMIN, RolesEnum.INSTRUCTOR],
        },
        canActivate: [TokenGuard, RoleGuard], */
      },
      {
        path: 'responsible-cecy',
        data: {
          allowedRoles: ['responsible_cecy', 'admin'],
        },
        loadChildren: () =>
          import('./responsible-cecy/responsible-cecy.module').then(
            (m) => m.ResponsibleCecyModule
          ),
        /* data: {
          roles: [RolesEnum.ADMIN, RolesEnum.RESPONSIBLE_CECY],
        },
        canActivate: [TokenGuard, RoleGuard], */
      },
      {
        path: 'responsible-course',
        canLoad: [],
        data: {
          allowedRoles: ['responsible_course', 'admin'],
        },
        loadChildren: () =>
          import('./responsible-course/responsible-course.module').then(
            (m) => m.ResponsibleCourseModule
          ),
        /*  data: {
          roles: [RolesEnum.ADMIN, RolesEnum.RESPONSIBLE_COURSE],
        },
        canActivate: [TokenGuard, RoleGuard], */
      },
      {
        path: 'student',
        loadChildren: () =>
          import('./student/student.module').then((m) => m.StudentModule),
        /* data: {
          roles: [RolesEnum.ADMIN, RolesEnum.STUDENT],
        },
        canActivate: [TokenGuard, RoleGuard], */
      },
      {
        path: 'responsible-cecy',
        canLoad: [],
        data: {
          allowedRoles: ['responsible_cecy', 'admin'],
        },
        loadChildren: () =>
          import('./responsible-cecy/responsible-cecy.module').then(
            (m) => m.ResponsibleCecyModule
          ),
        /* data: {
          roles: [RolesEnum.ADMIN],
        },
        canActivate: [TokenGuard, RoleGuard], */
      },
      {
        path: 'responsible-course',
        canLoad: [],
        data: {
          allowedRoles: ['responsible_course', 'admin'],
        },
        loadChildren: () =>
          import('./responsible-course/responsible-course.module').then(
            (m) => m.ResponsibleCourseModule
          ),
        /* data: {
          roles: [RolesEnum.ADMIN],
        },
        canActivate: [TokenGuard, RoleGuard], */
      },
      {
        path: 'responsible-execute',
        loadChildren: () =>
          import('./responsible-execute/responsible-execute.module').then(
            (m) => m.ResponsibleExecuteModule
          ),
      },
      {
        path: 'validacion-matricula',
        loadChildren: () =>
          import('./validacion-matricula/validacion-matricula.module').then(
            (m) => m.ValidacionMatriculaModule
          ),
      },
    ],
  },
  {
    path: 'estudiante',
    component: EstudiantesComponent,
    children: [
      {
        path: 'cursos',
        loadChildren: () =>
          import('./cursos/cursos.module').then((m) => m.CursosModule),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('./student/student.module').then((m) => m.StudentModule),
        /* data: {
          roles: [RolesEnum.ADMIN, RolesEnum.STUDENT],
        },
        canActivate: [TokenGuard, RoleGuard], */
      },
      {
        path: 'secretary-cecy',
        loadChildren: () =>
          import('./secretary-cecy/secretary-cecy.module').then(
            (m) => m.SecretaryCecyModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CecyRoutingModule { }
