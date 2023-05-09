import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from '@shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import {ImageModule} from 'primeng/image';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FieldsetModule} from 'primeng/fieldset';
import {TooltipModule} from "primeng/tooltip";
import {OrderListModule} from 'primeng/orderlist';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import {ToggleButtonModule} from 'primeng/togglebutton';

import { ResponsibleCecyRoutingModule } from './responsible-cecy-routing.module';
import { ResponsibleCecyComponent } from './responsible-cecy.component';
import { DetailPlanificationsComponent } from './detail-planifications/detail-planifications.component';
import { PlanificationsComponent } from './planifications/planifications.component';
import { RegistrationManagementComponent } from './registration-management/registration-management.component';
import { RegistrationManagementFormComponent } from './registration-management/registration-management-form/registration-management-form.component';
import { RegistrationManagementListComponent } from './registration-management/registration-management-list/registration-management-list.component';
import { HistoricRegistrationManagementFormComponent } from './registration-management/historic-registration-management-form/historic-registration-management-form.component';
import { HistoricRegistrationManagementListComponent } from './registration-management/historic-registration-management-list/historic-registration-management-list.component';
import { NullifyRegistrationFormComponent } from './registration-management/nullify-registration-form/nullify-registration-form.component';
import { KpiRegistrationManagementComponent } from './registration-management/kpi-registration-management/kpi-registration-management.component';

import { SchoolPeriodComponent } from './school-period/school-period.component';
import { DetailSchoolPeriodComponent } from './detail-school-period/detail-school-period.component';
import { SchoolPeriodFormComponent } from './school-period/school-period-form/school-period-form.component';
import { SchoolPeriodListComponent } from './school-period/school-period-list/school-period-list.component';
import { DetailSchoolPeriodListComponent } from './detail-school-period/detail-school-period-list/detail-school-period-list.component';
import { DetailSchoolPeriodFormComponent } from './detail-school-period/detail-school-period-form/detail-school-period-form.component';




@NgModule({
    declarations: [
        ResponsibleCecyComponent,
        DetailPlanificationsComponent,
        PlanificationsComponent,
        RegistrationManagementComponent,
        RegistrationManagementFormComponent,
        RegistrationManagementListComponent,
        NullifyRegistrationFormComponent,
        SchoolPeriodComponent,
        DetailSchoolPeriodComponent,
        SchoolPeriodFormComponent,
        SchoolPeriodListComponent,
        DetailSchoolPeriodListComponent,
        DetailSchoolPeriodFormComponent,
        KpiRegistrationManagementComponent,
        HistoricRegistrationManagementFormComponent,
        HistoricRegistrationManagementListComponent,
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        ResponsibleCecyRoutingModule,
        CardModule,
        DialogModule,
        DropdownModule,
        InputTextModule,
        InputSwitchModule,
        PaginatorModule,
        PanelModule,
        TooltipModule,
        FieldsetModule,
        OrderListModule,
        ProgressBarModule,
        ReactiveFormsModule,
        RippleModule,
        SharedModule,
        SplitButtonModule,
        ToolbarModule,
        ImageModule,
        TableModule,
        ToastModule,
        CalendarModule,
        InputTextareaModule,
        ChipModule,
        DividerModule,
        ToggleButtonModule
    ]
})
export class ResponsibleCecyModule { }
