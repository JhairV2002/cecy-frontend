import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

/**PrimeNG Modules */
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { SplitButtonModule } from 'primeng/splitbutton';
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
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { CalendarModule } from 'primeng/calendar';
import { PickListModule } from 'primeng/picklist';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DragDropModule } from 'primeng/dragdrop';
import { MessagesModule } from 'primeng/messages';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';

/**Components */
import { CoordinatorCecyRoutingModule } from './coordinator-cecy-routing.module';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { PoaComponent } from './poa/poa.component';
import { PoaListComponent } from './poa/poa-list/poa-list.component';
import { PoaFormComponent } from './poa/poa-form/poa-form.component';
import { SearchCourseComponent } from './course/search-course/search-course.component';
import { HomeComponent } from './home/home.component';
import { SchoolYearComponent } from './school-year/school-year.component';
import { SchoolYearListComponent } from './school-year/school-year-list/school-year-list.component';
import { SchoolYearFormComponent } from './school-year/school-year-form/school-year-form.component';
import { CommentsComponent } from './course/comments/comments.component';
import { AssistantComponent } from './assistant/assistant.component';
import { AssistantFormComponent } from './assistant/assistant-form/assistant-form.component';
import { AssistantListComponent } from './assistant/assistant-list/assistant-list.component';
import { SearchComponent } from './assistant/search/search.component';
import { PlanificationComponent } from './planification/planification.component';
import { SignatureComponent } from './signature/signature.component';
import { SignatureListComponent } from './signature/signature-list/signature-list.component';
import { SignatureFormComponent } from './signature/signature-form/signature-form.component';
import { SearchSignatureComponent } from './signature/search-signature/search-signature.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseListComponent,
    PoaComponent,
    PoaListComponent,
    PoaFormComponent,
    SearchCourseComponent,
    HomeComponent,
    SchoolYearComponent,
    SchoolYearListComponent,
    SchoolYearFormComponent,
    CommentsComponent,
    AssistantComponent,
    AssistantFormComponent,
    AssistantListComponent,
    SearchComponent,
    PlanificationComponent,
    SignatureComponent,
    SignatureListComponent,
    SignatureFormComponent,
    SearchSignatureComponent,
  ],
  imports: [
    CommonModule,
    CoordinatorCecyRoutingModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ToolbarModule,
    TableModule,
    SpeedDialModule,
    RippleModule,
    DialogModule,
    InputTextModule,
    ProgressBarModule,
    SplitButtonModule,
    PasswordModule,
    DividerModule,
    InputSwitchModule,
    PickListModule,
    KeyFilterModule,
    SharedModule,
    PaginatorModule,
    CardModule,
    ToastModule,
    ConfirmPopupModule,
    TabViewModule,
    AccordionModule,
    FormsModule,
    MultiSelectModule,
    ChipModule,
    CalendarModule,
    TooltipModule,
    InputTextareaModule,
    TagModule,
    RadioButtonModule,
    BreadcrumbModule,
    DragDropModule,
    MessagesModule,
    FileUploadModule,
    ImageModule,
    InputNumberModule,
  ],
})
export class CoordinatorCecyModule {}
