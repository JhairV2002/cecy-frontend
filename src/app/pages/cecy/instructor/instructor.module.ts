import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorRoutingModule } from './instructor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from "primeng/ripple";
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
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
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AttendanceComponent } from "./attendance/attendance.component";
import { ParticipantComponent } from "./participant/participant.component";
import { ParticipantFormComponent } from './participant/participant-form/participant-form.component';
import { ParticipantListComponent } from './participant/participant-list/participant-list.component';
import { ParticipantCourseComponent } from "./participant-course/participant-course.component";
import { ParticipantCourseFormComponent } from './participant-course/participant-course-form/participant-course-form.component';
import { ParticipantCourseListComponent } from './participant-course/participant-course-list/participant-course-list.component';
import { InstructorCourseComponent } from './instructor-course/instructor-course.component';
import { AttendanceCourseFormComponent } from './attendance/attendance-course-form/attendance-course-form.component';
import { AttendanceFormComponent } from './attendance/attendance-form/attendance-form.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';
import { TemariCourseComponent } from './temari-course/temari-course.component';
import { InstructorCourseCardComponent } from './instructor-course/instructor-course-card/instructor-course-card.component';

import {FileUploadModule} from 'primeng/fileupload';
import {ListboxModule} from 'primeng/listbox';
import { AttendanceRecordsComponent } from './attendance/attendance-records/attendance-records.component';
import {ImageComponent} from "./attendance/attendance-records/image/image.component";

@NgModule({
  declarations: [
    AttendanceComponent,
    ParticipantComponent,
    ParticipantFormComponent,
    ParticipantListComponent,
    ParticipantCourseComponent,
    ParticipantCourseFormComponent,
    ParticipantCourseListComponent,
    InstructorCourseComponent,
    InstructorCourseCardComponent,
    AttendanceCourseFormComponent,
    AttendanceFormComponent,
    AttendanceListComponent,
    TemariCourseComponent,
    AttendanceRecordsComponent,
    ImageComponent
  ],
  exports: [
    InstructorCourseCardComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    SharedModule,
    TableModule,
    SpeedDialModule,
    RippleModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    ProgressBarModule,
    SplitButtonModule,
    PasswordModule,
    DividerModule,
    KeyFilterModule,
    ToolbarModule,
    PaginatorModule,
    CardModule,
    ToastModule,
    ConfirmPopupModule,
    PickListModule,
    CheckboxModule,
    InputTextareaModule,
    ListboxModule,
    FileUploadModule
  ]
})
export class InstructorModule {
}
