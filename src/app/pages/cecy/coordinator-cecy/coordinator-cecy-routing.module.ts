import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentInstructorComponent } from './assignment-instructor/assignment-instructor.component';
import { AssignmentedInstructorComponent } from './assignmented-instructor/assignmented-instructor.component';
import { CertificateFormComponent } from './certificate/certificate-form/certificate-form.component';
import { CertificateListComponent } from './certificate/certificate-list/certificate-list.component';
import { CertificateComponent } from './certificate/certificate.component';
import { CourseVisualizationFormComponent } from './course-visualization/course-visualization-form/course-visualization-form.component';
import { CourseVisualizationListComponent } from './course-visualization/course-visualization-list/course-visualization-list.component';
import { CourseVisualizationComponent } from './course-visualization/course-visualization.component';
import { CourseComponent } from './course/course.component';
import { PlanificationComponent } from './planification/planification.component';
import { PoaFormComponent } from './poa/poa-form/poa-form.component';
import { CourseListComponent } from './profile-instructor-courses/course-list/course-list.component';
//import { VisualizationCourseComponent } from './visualization-course/visualization-course.component';
import { HomeComponent } from './home/home.component';
import { TabsComponent } from '../responsible-course/tabs/tabs.component';
import { SchoolYearComponent } from './school-year/school-year.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'course', component: CourseComponent },
  { path: 'school-year', component: SchoolYearComponent },
  //{ path: 'course/visualization/:id', component: VisualizationCourseComponent },
  { path: 'course/visualization/:id', component: TabsComponent },

  { path: 'certificate', component: CertificateComponent },
  { path: 'certificate-form', component: CertificateFormComponent },
  { path: 'certificate-list', component: CertificateListComponent },
  {
    path: 'course-visualization-form',
    component: CourseVisualizationFormComponent,
  },
  {
    path: 'course-visualization-list',
    component: CourseVisualizationListComponent,
  },
  { path: 'course-visualization', component: CourseVisualizationComponent },
  { path: 'assignment-instructor', component: AssignmentInstructorComponent },
  {
    path: 'assignmented-instructor',
    component: AssignmentedInstructorComponent,
  },
  { path: 'profile-instructor-courses', component: CourseListComponent },
  { path: 'planification/course/:id', component: PlanificationComponent },
  { path: 'poa-form', component: PoaFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoordinatorCecyRoutingModule {}
