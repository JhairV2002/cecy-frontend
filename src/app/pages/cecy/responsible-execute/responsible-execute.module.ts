import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsibleExecuteRoutingModule } from './responsible-execute-routing.module';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { FechaComponent } from './asistencia/fecha/fecha.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstudiantesComponent } from './notas/estudiantes.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@shared/shared.module';
import { NombreFilterPipe } from './notas/filter.pipe';
import { CursoComponent } from './curso/curso.component';
import { InputNumberModule } from 'primeng/inputnumber';

// PRIME NG
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AsistenciaComponent,
    FechaComponent,
    EstudiantesComponent,
    NombreFilterPipe,
    HomeComponent,
    CursoComponent,
  ],
  imports: [
    CommonModule,
    ResponsibleExecuteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    InputNumberModule,
    SkeletonModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    ToolbarModule,
    FieldsetModule,
    FileUploadModule,
    DividerModule,
    CardModule,
    PaginatorModule,
    ProgressSpinnerModule,
    InputTextModule,
    InputTextareaModule,
    MessagesModule,
    ToastModule,
    DialogModule,
  ],
})
export class ResponsibleExecuteModule {}
