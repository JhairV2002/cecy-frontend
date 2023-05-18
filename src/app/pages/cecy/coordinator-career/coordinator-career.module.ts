import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CoordinatorCareerRoutingModule } from './coordinator-career-routing.module';
import { CoordinatorCareerComponent } from './coordinator-career.component';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseFormComponent } from './course/course-form/course-form.component';
import { PlanificationComponent } from './planification/planification.component';
import { PlanificationListComponent } from './planification/planification-list/planification-list.component';
import { PlanificationFormComponent } from './planification/planification-form/planification-form.component';
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorListComponent } from './instructor/instructor-list/instructor-list.component';
import { InstructorFormComponent } from './instructor/instructor-form/instructor-form.component';
import { AssignmentInstructorsFormComponent } from './assignment-instructor/assignment-instructors-form.component';

/* Prime NG */
import {ChartModule} from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SharedModule } from '@shared/shared.module';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PickListModule } from 'primeng/picklist';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { RequirementComponent } from './requirement/requirement.component';
import { RequirementFormComponent } from './requirement/requirement-form/requirement-form.component';
import { RequirementListComponent } from './requirement/requirement-list/requirement-list.component';
import { InitialCourseKpiComponent } from './course/initial-course-kpi/initial-course-kpi.component';
import { InitialPlanificationKpiComponent } from './planification/initial-planification-kpi/initial-planification-kpi.component';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AssignmentInstructorsFormComponent,
    CoordinatorCareerComponent,
    CourseComponent,
    CourseListComponent,
    CourseFormComponent,
    PlanificationComponent,
    PlanificationListComponent,
    PlanificationFormComponent,
    InstructorComponent,
    InstructorListComponent,
    InstructorFormComponent,
    RequirementComponent,
    RequirementFormComponent,
    RequirementListComponent,
    AssignmentInstructorsFormComponent,
    InitialCourseKpiComponent,
    InitialPlanificationKpiComponent,
    RequirementListComponent,
    DashboardComponent,
  ],
  exports: [InitialPlanificationKpiComponent],
  imports: [
    CommonModule,
    CoordinatorCareerRoutingModule,
    ChartModule,
    TableModule,
    SpeedDialModule,
    RippleModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ProgressBarModule,
    SplitButtonModule,
    DropdownModule,
    PasswordModule,
    DividerModule,
    InputSwitchModule,
    KeyFilterModule,
    SharedModule,
    ToolbarModule,
    PaginatorModule,
    CardModule,
    ToastModule,
    ConfirmPopupModule,
    PickListModule,
    CalendarModule,
    ChipModule,
    InputNumberModule,
    TooltipModule,
  ],
})
export class CoordinatorCareerModule {}
