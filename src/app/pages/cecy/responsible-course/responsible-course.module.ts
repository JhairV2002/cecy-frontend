import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsibleCourseRoutingModule } from './responsible-course-routing.module';
import { ResponsibleCourseComponent } from './responsible-course.component';
import { CourseListComponent } from './general-information/course-list/course-list.component';
import { CourseFormComponent } from './general-information/course-form/course-form.component';
import { PlanificationFormComponent } from "./planification/planification-form/planification-form.component";
import { PlanificationListComponent } from "./planification/planification-list/planification-list.component";
import { PlanificationComponent } from "./planification/planification.component";
import { DetailPlanificationFormComponent } from "./detail-planification/detail-planification-form/detail-planification-form.component";
import { DetailPlanificationListComponent } from "./detail-planification/detail-planification-list/detail-planification-list.component";
import { DetailPlanificationComponent } from "./detail-planification/detail-planification.component";
import { RegistrationManagementComponent } from './registration-management/registration-management.component';
import { RegistrationManagementFormComponent } from './registration-management/registration-management-form/registration-management-form.component';
import { RegistrationManagementListComponent } from './registration-management/registration-management-list/registration-management-list.component';
import { KpiRegistrationManagementComponent } from './registration-management/kpi-registration-management/kpi-registration-management.component';
import { AssignmentInstructorsFormComponent } from './detail-planification/assignment-instructors-form/assignment-instructors-form.component';

import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SharedModule } from '@shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from "primeng/chip";
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {FileUploadModule} from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


import { CurricularDesignComponent } from './curricular-design/curricular-design.component';
import { TopicFormComponent } from './curricular-design/topic-form/topic-form.component';
import { PrerequisitesComponent } from './curricular-design/prerequisites/prerequisites.component';
import { TabsComponent } from './tabs/tabs.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    ResponsibleCourseComponent,
    CourseListComponent,
    CourseFormComponent,
    RegistrationManagementComponent,
    RegistrationManagementFormComponent,
    RegistrationManagementListComponent,
    CurricularDesignComponent,
    TopicFormComponent,
    PrerequisitesComponent,
    PlanificationFormComponent,
    PlanificationListComponent,
    PlanificationComponent,
    DetailPlanificationFormComponent,
    DetailPlanificationListComponent,
    DetailPlanificationComponent,
    TabsComponent,
    KpiRegistrationManagementComponent,
    AssignmentInstructorsFormComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MessagesModule,
    MessageModule,
    ResponsibleCourseRoutingModule,
    TableModule,
    SpeedDialModule,
    RippleModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    ProgressBarModule,
    CheckboxModule,
    SplitButtonModule,
    PasswordModule,
    DividerModule,
    KeyFilterModule,
    ToolbarModule,
    AccordionModule,
    TabViewModule,
    PaginatorModule,
    CardModule,
    ToastModule,
    ConfirmPopupModule,
    CalendarModule,
    SharedModule,
    ButtonModule,
    BreadcrumbModule,
    ChipModule,
    PanelModule,
    InputTextareaModule,
    PickListModule,
    OrderListModule,
    TooltipModule,
    FieldsetModule,
    FileUploadModule,
    ConfirmDialogModule
  ]
})
export class ResponsibleCourseModule { }
