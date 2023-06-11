import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinatorCareerComponent } from './coordinator-career.component';
import { InstructorListComponent } from './instructor/instructor-list/instructor-list.component';
import { RequirementComponent } from './requirement/requirement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'planification', component: CoordinatorCareerComponent },
  { path: 'instructor', component: InstructorListComponent },
  { path: 'requirement', component: RequirementComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoordinatorCareerRoutingModule {}
