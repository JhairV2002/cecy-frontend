import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationManagementListComponent } from './registration-management/registration-management-list/registration-management-list.component';
import { RegistrationManagementFormComponent } from './registration-management/registration-management-form/registration-management-form.component';
import { RegistrationManagementComponent } from './registration-management/registration-management.component';
import { ResponsibleCecyComponent } from './responsible-cecy.component';
import { SchoolPeriodComponent } from './school-period/school-period.component';
import { DetailSchoolPeriodComponent } from './detail-school-period/detail-school-period.component';
import { HistoricRegistrationManagementFormComponent } from './registration-management/historic-registration-management-form/historic-registration-management-form.component';
import { HistoricRegistrationManagementListComponent } from './registration-management/historic-registration-management-list/historic-registration-management-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    component: ResponsibleCecyComponent,
    children: [
      { path: 'registrations', component: RegistrationManagementComponent },
      {
        path: 'registration/:idD/:action/:id',
        component: RegistrationManagementFormComponent,
      },
      {
        path: 'historic-registration/:id',
        component: HistoricRegistrationManagementFormComponent,
      },
      {
        path: 'historic-registrations',
        component: HistoricRegistrationManagementListComponent,
      },
    ],
  },
  { path: 'school-period', component: SchoolPeriodComponent },
  { path: 'detail-school-period', component: DetailSchoolPeriodComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsibleCecyRoutingModule {}
