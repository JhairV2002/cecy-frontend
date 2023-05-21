import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsibleExecuteRoutingModule } from './responsible-execute-routing.module';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ListadoFechaComponent } from './asistencia/listado-fecha/listado-fecha.component';
import { RegistroFotograficoComponent } from './asistencia/registro-fotografico/registro-fotografico.component';

import { FormsModule } from '@angular/forms';
import { EstudiantesComponent } from './notas/estudiantes.component';

@NgModule({
  declarations: [
    AsistenciaComponent,
    ListadoFechaComponent,
    RegistroFotograficoComponent,
    EstudiantesComponent
    
   
  ],
  imports: [
    CommonModule,
    ResponsibleExecuteRoutingModule,
    FormsModule
  ]
})
export class ResponsibleExecuteModule { }
