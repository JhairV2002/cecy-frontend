
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './general-information/course-list/course-list.component';
import { CourseFormComponent } from './general-information/course-form/course-form.component';
import { DetailPlanificationComponent } from './detail-planification/detail-planification.component';
import { CurricularDesignComponent } from './curricular-design/curricular-design.component';
import { PlanificationComponent } from './planification/planification.component';
import { ResponsibleCourseComponent } from './responsible-course.component';
import { TabsComponent } from './tabs/tabs.component';
import { RegistrationManagementListComponent } from './registration-management/registration-management-list/registration-management-list.component';
import { RegistrationManagementFormComponent } from './registration-management/registration-management-form/registration-management-form.component';

const routes: Routes = [
  { path: '', component: ResponsibleCourseComponent },
  { path: 'courses-list', component: CourseListComponent },
  { path: 'course-form', component: CourseFormComponent },
  { path: 'planification', component: PlanificationComponent },
  { path: 'horarios/:id', component: DetailPlanificationComponent },
  { path: 'curricular-design/:id', component: CurricularDesignComponent },
  { path: 'course/add/:id', component: TabsComponent },
  { path: 'course/edit/:id', component: TabsComponent },

  { path: 'registrations',component: RegistrationManagementListComponent },
  { path: 'registration/:id',component: RegistrationManagementFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class ResponsibleCourseRoutingModule { }
