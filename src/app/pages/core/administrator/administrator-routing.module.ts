import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@layout/main/main.component';
import { HomeComponent } from './home/home.component';
import { CareerComponent } from './career/career.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UserComponent },
      { path: 'roles', component: RoleComponent },
      { path: 'careers', component: CareerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
