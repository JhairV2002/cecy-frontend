import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@layout/main/main.component';
import { HomeComponent } from './home/home.component';
import { CareerComponent } from './career/career.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { NotFoundComponent } from '../common/not-found/not-found.component';
import { ChangePasswordComponent } from '@shared/components/user/change-password/change-password.component';
import { ChangePasswordUserComponent } from './change-password-user/change-password-user.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UserComponent },
      {
        path: 'users/change-password/user/:userId/encrypted/:hash',
        component: ChangePasswordUserComponent,
      },
      { path: 'roles', component: RoleComponent },
      { path: 'careers', component: CareerComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: '**', redirectTo: 'not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
