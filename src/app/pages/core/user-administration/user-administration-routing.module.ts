import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAdministrationComponent } from './user-administration.component';
import { MainComponent } from './../../../layout/main/main.component';
import { TokenGuard } from 'src/app/guards/token.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full',
      },
      {
        path: 'admin',
        component: UserAdministrationComponent,
        canActivate: [TokenGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [TokenGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAdministrationRoutingModule {}
