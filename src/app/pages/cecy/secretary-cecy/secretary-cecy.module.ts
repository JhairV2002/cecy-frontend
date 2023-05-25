import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretaryCecyRoutingModule } from './secretary-cecy-routing.module';
import { SharedModule } from '@shared/shared.module';

// submodules
import { CodigosCertificadoListaComponent } from './codigos-certificado/lista/codigos-certificado-lista.component';
import { SolicitudCertificadoListaComponent } from './solicitud-certificado/solicitud-certificado-lista/solicitud-certificado-lista.component';
import { SolicitudCertificadoBusquedaComponent } from './solicitud-certificado/solicitud-certificado-busqueda/solicitud-certificado-busqueda.component';
import { EncabezadoCodigoComponent } from './codigos-certificado/encabezado-codigo/encabezado-codigo.component';
import { ModalCodigoComponent } from './codigos-certificado/modal-codigo/modal-codigo.component';
import { SolicitudCertificadoToolbarComponent } from './solicitud-certificado/solicitud-certificado-lista/toolbar/solicitud-certificado-toolbar/solicitud-certificado-toolbar.component';
import { FormsModule } from '@angular/forms';
import { ReporteComponent } from './reporte/reporte.component';
import { HomeComponent } from './home/home.component';
import { PanelCursoComponent } from './panel-curso/panel-curso.component';

@NgModule({
  declarations: [
    CodigosCertificadoListaComponent,
    SolicitudCertificadoListaComponent,
    SolicitudCertificadoBusquedaComponent,
    EncabezadoCodigoComponent,
    ModalCodigoComponent,
    SolicitudCertificadoToolbarComponent,
    ReporteComponent,
    HomeComponent,
    PanelCursoComponent,
  ],
  imports: [CommonModule, SecretaryCecyRoutingModule, SharedModule],
})
export class SecretaryCecyModule {}