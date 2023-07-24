import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@layout/main/main.component';
import { HasRoleGuard } from 'src/app/guards/has-role.guard';
import { NotFoundComponent } from '../core/common/not-found/not-found.component';

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
        path: 'assistant-cecy',
        loadChildren: () =>
          import('./assistant/assistant.module').then((m) => m.AssistantModule),
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: '**',
        redirectTo: 'not-found',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CecyRoutingModule {}
