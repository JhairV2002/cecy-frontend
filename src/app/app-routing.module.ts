import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* import { MainComponent, BlankComponent } from '@layout/index';
 */
import { RoleGuard } from '@shared/guards/role.guard';
import { RolesEnum } from '@shared/enums/roles.enum';
import { BlankComponent } from '@shared/components/layouts/blank/blank.component';
import { AdminGuard } from './guards/admin.guard';
import { HasRoleGuard } from './guards/has-role.guard';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';
//import { ResponsibleExecutionComponent } from './pages/cecy/responsible-execution/responsible-execution/responsible-execution.component';
import { AsistenciaComponent } from './pages/cecy/responsible-execute/asistencia/asistencia.component';
import { ResponsibleCecyComponent } from './pages/cecy/responsible-cecy/responsible-cecy.component';
import { EstudiantesComponent } from './pages/cecy/responsible-execute/notas/estudiantes.component';
import { CursoComponent } from './pages/cecy/responsible-execute/curso/curso.component';

const routes: Routes = [
  {
    path: 'curso', component:CursoComponent,
  },
  /*{
    path: 'estudiantes', component:EstudiantesComponent,
  },*/

 /* {
    path: 'ejecucion', component:ResponsibleExecutionComponent,
  },
  */
 /*   {
    path: 'asistencia', component:AsistenciaComponent,
  },*/
  {

    path: '',
    canActivate: [RedirectGuard],
    loadChildren: () =>
      import('./pages/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'administrator',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        './pages/core/user-administration/user-administration.module'
      ).then((m) => m.UserAdministrationModule),
  },
  {
    path: 'cecy',
    loadChildren: () =>
      import('./pages/cecy/cecy.module').then((m) => m.CecyModule),
  },
  // {
  //   path: 'cecy/guest',
  //   loadChildren: () =>
  //     import('./pages/cecy/guest/guest.module').then((m) => m.GuestModule),
  // },
  // {
  //   path: 'common',
  //   component: BlankComponent,
  //   loadChildren: () =>
  //     import('./pages/core/common/common.module').then((m) => m.CommonModule),
  // },
  // {
  //   path: '**',
  //   redirectTo: 'common/not-found',
  // },

  //{ path: 'notas', component: EstudiantesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
