import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './general-information/course-list/course-list.component';
import { CourseFormComponent } from './general-information/course-form/course-form.component';
import { DetailPlanificationComponent } from './detail-planification/detail-planification.component';
import { CurricularDesignComponent } from './curricular-design/curricular-design.component';
import { TabsComponent } from './tabs/tabs.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from '@shared/components/user/change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'my-courses', component: CourseListComponent },
  { path: 'course-form', component: CourseFormComponent },
  { path: 'horarios/:id', component: DetailPlanificationComponent },
  { path: 'curricular-design/:id', component: CurricularDesignComponent },
  { path: 'course/add/:id', component: TabsComponent },
  { path: 'course/edit/:id', component: TabsComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class ResponsibleCourseRoutingModule {}
