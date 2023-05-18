import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

/**PrimeNG Modules */
import {TooltipModule} from 'primeng/tooltip';
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
import { ChipModule } from "primeng/chip";
import { CalendarModule } from 'primeng/calendar';
import { PickListModule } from 'primeng/picklist';
import {InputTextareaModule} from 'primeng/inputtextarea';


/**Components */
import { CoordinatorCecyRoutingModule } from './coordinator-cecy-routing.module';
import { CertificateComponent } from './certificate/certificate.component';
import { CertificateListComponent } from './certificate/certificate-list/certificate-list.component';
import { CertificateFormComponent } from './certificate/certificate-form/certificate-form.component';
import { CourseVisualizationComponent } from './course-visualization/course-visualization.component';
import { CourseVisualizationFormComponent } from './course-visualization/course-visualization-form/course-visualization-form.component';
import { CourseVisualizationListComponent } from './course-visualization/course-visualization-list/course-visualization-list.component';
import { CourseKpiComponent } from './course-visualization/course-kpi/course-kpi.component';
import { AssignmentInstructorComponent } from './assignment-instructor/assignment-instructor.component';
import { AssignmentInstructorFormComponent } from './assignment-instructor/assignment-instructor-form/assignment-instructor-form.component';
import { AssignmentInstructorListComponent } from './assignment-instructor/assignment-instructor-list/assignment-instructor-list.component';
import { AssignmentedInstructorComponent } from './assignmented-instructor/assignmented-instructor.component';
import { ProfileInstructorCoursesComponent } from './profile-instructor-courses/profile-instructor-courses.component';
import { ProfileInstructorCoursesFormComponent } from './profile-instructor-courses/profile-instructor-courses-form/profile-instructor-courses-form.component';
import { ProfileInstructorCoursesListComponent } from './profile-instructor-courses/profile-instructor-courses-list/profile-instructor-courses-list.component';
import { CourseComponent } from "./course/course.component";
import { CourseFormComponent } from "./course/course-form/course-form.component";
import { CourseListComponent } from "./course/course-list/course-list.component";
import { PlanificationComponent } from "./planification/planification.component";
import { PlanificationFormComponent } from "./planification/planification-form/planification-form.component";
import { PlanificationListComponent } from "./planification/planification-list/planification-list.component";
import { PoaComponent } from './poa/poa.component';
import { PoaListComponent } from './poa/poa-list/poa-list.component';
import { PoaFormComponent } from './poa/poa-form/poa-form.component';

import { CourseListComponent as CourseList } from "./profile-instructor-courses/course-list/course-list.component";
import { CourseFormComponent as CourseForm } from "./profile-instructor-courses/course-form/course-form.component";
import { AssignmentInstructorsFormComponent } from "./profile-instructor-courses/assignment-instructors-form/assignment-instructors-form.component";
import { ShowPerfilFormComponent } from './profile-instructor-courses/showperfil-form/showperfil-form.component';
import { VisualizationCourseComponent } from './visualization-course/visualization-course.component';
import { SearchCourseComponent } from './course/search-course/search-course.component';
import { HorarioFormComponent } from './horario-form/horario-form.component';
import { HomeComponent } from './home/home.component';
//import { AddFormHorariosComponent } from './../responsible-course/tabs/add-form-horarios/add-form-horarios.component';


@NgModule({
  declarations: [
    CertificateComponent,
    CertificateListComponent,
    CertificateFormComponent,
    CourseVisualizationComponent,
    CourseVisualizationFormComponent,
    CourseVisualizationListComponent,
    AssignmentInstructorComponent,
    AssignmentInstructorFormComponent,
    AssignmentInstructorListComponent,
    AssignmentedInstructorComponent,
    ProfileInstructorCoursesComponent,
    ProfileInstructorCoursesFormComponent,
    ProfileInstructorCoursesListComponent,
    CourseKpiComponent,
    CourseComponent,
    CourseFormComponent,
    CourseListComponent,
    PlanificationComponent,
    PlanificationFormComponent,
    PlanificationListComponent,
    PoaComponent,
    PoaListComponent,
    PoaFormComponent,
    CourseList,
    CourseForm,
    AssignmentInstructorsFormComponent,
    ShowPerfilFormComponent,
    VisualizationCourseComponent,
    SearchCourseComponent,
    HorarioFormComponent,
    HomeComponent,
    //AddFormHorariosComponent
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
    InputTextareaModule
  ]
})
export class CoordinatorCecyModule { }
