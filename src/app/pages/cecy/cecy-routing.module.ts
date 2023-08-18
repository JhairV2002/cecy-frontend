import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@layout/main/main.component';
import { NotFoundComponent } from '../core/common/not-found/not-found.component';
import { RedirectGuard } from '@guards/redirect.guard';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RedirectGuard],
    loadChildren: () =>
      import('./../authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'coordinator-career',
        canActivate: [AuthGuard],
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
        canActivate: [AuthGuard],
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
        path: 'responsible-course',
        canActivate: [AuthGuard],
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
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./responsible-execute/responsible-execute.module').then(
            (m) => m.ResponsibleExecuteModule
          ),
      },
      {
        path: 'assistant-cecy',
        canActivate: [AuthGuard],
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
export class CecyRoutingModule { }
