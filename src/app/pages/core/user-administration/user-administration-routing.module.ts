import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAdministrationComponent } from './user-administration.component';
import { MainComponent } from './../../../layout/main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { CareersListComponent } from './careers-list/careers-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent },
      { path: 'users', component: UserAdministrationComponent },
      { path: 'roles', component: RolesListComponent },
      { path: 'careers', component: CareersListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAdministrationRoutingModule {}
