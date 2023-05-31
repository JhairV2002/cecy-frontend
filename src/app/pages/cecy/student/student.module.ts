import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { RegistrationCourseComponent } from './registration-course/registration-course.component';
import { ViewAttendanceDetailsComponent } from './view-attendance-details/view-attendance-details.component';
import { AttendanceRegistrationComponent } from './attendance-registration/attendance-registration.component';
import { CertificatesStudentComponent } from './certificates-student/certificates-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentComponent } from './student.component';
import { ViewCoursesParticipantComponent } from './view-courses-participant/view-courses-participant.component';
import { ViewAttendancesParticipantComponent } from './view-attendances-participant/view-attendances-participant.component';
import { ViewGradesParticipantComponent } from './view-grades-participant/view-grades-participant.component';

// PrimeNg Modules
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { TreeModule } from 'primeng/tree';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { SharedModule } from '@shared/shared.module';
import { FieldsetModule } from 'primeng/fieldset';
import { CalendarModule } from 'primeng/calendar';
import { TopicCourseComponent } from './topic-course/topic-course.component';

@NgModule({
  declarations: [
    StudentComponent,
    AttendanceRegistrationComponent,
    CertificatesStudentComponent,
    RegistrationCourseComponent,
    ViewAttendanceDetailsComponent,
    CoursesComponent,
    ViewCoursesParticipantComponent,
    ViewGradesParticipantComponent,
    ViewAttendancesParticipantComponent,
    CoursesListComponent,
    CourseDetailComponent,
    TopicCourseComponent

  ],
  imports: [
    StudentRoutingModule,
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ButtonModule,
    RippleModule,
    CardModule,
    InputSwitchModule,
    InputTextModule,
    TableModule,
    SidebarModule,
    RippleModule,
    ToolbarModule,
    MultiSelectModule,
    HttpClientModule,
    PaginatorModule,
    DropdownModule,
    DialogModule,
    TabViewModule,
    AccordionModule,
    TreeModule,
    ListboxModule,
    ToastModule,
    ConfirmPopupModule,
    KeyFilterModule,
    DividerModule,
    PasswordModule,
    SplitButtonModule,
    ProgressBarModule,
    TableModule,
    SharedModule,
    FieldsetModule,
    CalendarModule
  ]
})
export class StudentModule { }
