import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsibleExecuteRoutingModule } from './responsible-execute-routing.module';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { FechaComponent } from './asistencia/fecha/fecha.component';
import { RegistroFotograficoComponent } from './asistencia/registro-fotografico/registro-fotografico.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstudiantesComponent } from './notas/estudiantes.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@shared/shared.module';
import { NombreFilterPipe } from './notas/filter.pipe';
import { CursoComponent } from './curso/curso.component'
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    AsistenciaComponent,
    FechaComponent,
    RegistroFotograficoComponent,
    EstudiantesComponent,
    NombreFilterPipe,
    HomeComponent,
    CursoComponent,
  ],
  imports: [
    CommonModule,
    ResponsibleExecuteRoutingModule,
    FormsModule,
    SharedModule,
    InputNumberModule
  ],
})
export class ResponsibleExecuteModule { }
