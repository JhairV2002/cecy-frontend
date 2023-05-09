import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinatorCareerComponent } from './coordinator-career.component';
import { InstructorListComponent } from './instructor/instructor-list/instructor-list.component';
import { PlanificationComponent } from './planification/planification.component';
import { SchoolPeriodComponent } from '../responsible-cecy/school-period/school-period.component';
import { RequirementComponent } from './requirement/requirement.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'course',
    component: CoordinatorCareerComponent,
  },
  {
    path: 'planification/course/:id',
    component: PlanificationComponent,
  },
  {
    path: 'instructor',
    component: InstructorListComponent,
  },
  {
    path: 'requirement',
    component: RequirementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoordinatorCareerRoutingModule {}
