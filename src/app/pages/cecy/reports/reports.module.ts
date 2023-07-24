import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';

import { ReportPhotographicRecordComponent } from './report-photographic-record/report-photographic-record.component';
import { ReportCourseFinalComponent } from './report-course-final/report-course-final.component';

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
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [ReportPhotographicRecordComponent, ReportCourseFinalComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
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
    CheckboxModule,
  ],
})
export class ReportsModule {}
