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

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
