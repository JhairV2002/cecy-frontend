import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { CertificatesStudentComponent } from './certificates-student/certificates-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentComponent } from './student.component';

// PrimeNg Modules
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
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
import { InscriptionFormComponent } from './inscription-form/form/inscription-form.component';
import { CmbPublicityComponent } from './inscription-form/cmb-publicity/cmb-publicity.component';
import { CmbCoursesComponent } from './inscription-form/cmb-courses/cmb-courses.component';
import { CoursesListaComponent } from './courses-list/courses-list.component';

@NgModule({
  declarations: [
    CoursesListaComponent,
    StudentComponent,
    CertificatesStudentComponent,
    InscriptionFormComponent,
    CmbPublicityComponent,
    CmbCoursesComponent,
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
    CalendarModule,
  ],
})
export class StudentModule {}
