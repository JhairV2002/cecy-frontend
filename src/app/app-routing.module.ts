import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '@shared/guards/role.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { EstudiantesComponent } from '@layout/estudiantes/estudiantes.component';
import { tokenStudentGuard } from '@guards/token-student.guard';

const routes: Routes = [
  {
    path: '', 
    canActivate: [RedirectGuard],
    loadChildren: () =>
      import('./pages/website/website.module').then((m) => m.WebsiteModule),
  },
  {
    path: 'cecy',
    loadChildren: () =>
      import('./pages/cecy/cecy.module').then((m) => m.CecyModule),
  },
  {
    path: 'administrator',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/core/administrator/administrator.module').then(
        (m) => m.AdministratorModule
      ),
  },
  {
    path: 'estudiante',
    canActivate: [tokenStudentGuard],
    component: EstudiantesComponent,
    loadChildren: () =>
      import('./pages/estudiante/estudiante.module').then(
        (m) => m.EstudianteModule
      ),
  },
  {
    path: 'common',
    loadChildren: () =>
      import('./pages/core/common/common.module').then((m) => m.CommonModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
