import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsibleExecuteRoutingModule } from './responsible-execute-routing.module';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ListadoFechaComponent } from './asistencia/listado-fecha/listado-fecha.component';
import { RegistroFotograficoComponent } from './asistencia/registro-fotografico/registro-fotografico.component';


@NgModule({
  declarations: [
    AsistenciaComponent,
    ListadoFechaComponent,
    RegistroFotograficoComponent
  ],
  imports: [
    CommonModule,
    ResponsibleExecuteRoutingModule
  ]
})
export class ResponsibleExecuteModule { }
