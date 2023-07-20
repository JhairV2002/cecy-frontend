import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorRoutingModule } from './instructor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
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
import { AttendanceComponent } from './attendance/attendance.component';
import { ParticipantComponent } from './participant/participant.component';
import { ParticipantFormComponent } from './participant/participant-form/participant-form.component';
import { AttendanceCourseFormComponent } from './attendance/attendance-course-form/attendance-course-form.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';
import { TemariCourseComponent } from './temari-course/temari-course.component';

import { FileUploadModule } from 'primeng/fileupload';
import { ListboxModule } from 'primeng/listbox';
import { AttendanceRecordsComponent } from './attendance/attendance-records/attendance-records.component';
import { ImageComponent } from './attendance/attendance-records/image/image.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AttendanceComponent,
    ParticipantComponent,
    ParticipantFormComponent,
    AttendanceCourseFormComponent,
    AttendanceListComponent,
    TemariCourseComponent,
    AttendanceRecordsComponent,
    ImageComponent,
    HomeComponent,
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
    FileUploadModule,
  ],
})
export class InstructorModule {}
