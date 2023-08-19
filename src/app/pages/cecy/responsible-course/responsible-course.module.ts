import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsibleCourseRoutingModule } from './responsible-course-routing.module';
import { ResponsibleCourseComponent } from './responsible-course.component';
import { CourseListComponent } from './general-information/course-list/course-list.component';
import { CourseFormComponent } from './general-information/course-form/course-form.component';
import { DetailPlanificationFormComponent } from './detail-planification/detail-planification-form/detail-planification-form.component';
import { DetailPlanificationListComponent } from './detail-planification/detail-planification-list/detail-planification-list.component';
import { DetailPlanificationComponent } from './detail-planification/detail-planification.component';
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
import { ChipModule } from 'primeng/chip';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { CurricularDesignComponent } from './curricular-design/curricular-design.component';
import { TopicFormComponent } from './curricular-design/topic-form/topic-form.component';
import { PrerequisitesComponent } from './curricular-design/prerequisites/prerequisites.component';
import { TabsComponent } from './tabs/tabs.component';
import { HomeComponent } from './home/home.component';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    ResponsibleCourseComponent,
    CourseListComponent,
    CourseFormComponent,
    CurricularDesignComponent,
    TopicFormComponent,
    PrerequisitesComponent,
    DetailPlanificationFormComponent,
    DetailPlanificationListComponent,
    DetailPlanificationComponent,
    TabsComponent,
    AssignmentInstructorsFormComponent,
    HomeComponent,
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
    ConfirmDialogModule,
    ProgressSpinnerModule,
    TagModule,
    ImageModule
  ],
})
export class ResponsibleCourseModule {}
