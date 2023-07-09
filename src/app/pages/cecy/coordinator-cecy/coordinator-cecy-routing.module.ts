import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { PoaFormComponent } from './poa/poa-form/poa-form.component';
import { HomeComponent } from './home/home.component';
import { TabsComponent } from '../responsible-course/tabs/tabs.component';
import { SchoolYearComponent } from './school-year/school-year.component';
import { AssignmentInstructorsFormComponent } from '../coordinator-career/assignment-instructor/assignment-instructors-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'course', component: CourseComponent },
  { path: 'school-year', component: SchoolYearComponent },
  { path: 'course/visualization/:id', component: TabsComponent },
  { path: 'profile-instructor', component: AssignmentInstructorsFormComponent },
  { path: 'poa-form', component: PoaFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoordinatorCecyRoutingModule {}
