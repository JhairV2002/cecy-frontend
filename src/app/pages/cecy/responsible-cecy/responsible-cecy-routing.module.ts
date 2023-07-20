import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsibleCecyComponent } from './responsible-cecy.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from '@shared/components/user/change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    component: ResponsibleCecyComponent,
    children: [],
  },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsibleCecyRoutingModule {}
