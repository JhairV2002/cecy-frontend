import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAdministrationComponent } from './user-administration.component';
import { MainComponent } from './../../../layout/main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: UserAdministrationComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAdministrationRoutingModule {}
