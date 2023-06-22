import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRequestRoutingModule } from './certificate-request-routing.module';
import { SolicitudCertificadoToolbarComponent } from './solicitud-certificado-toolbar/solicitud-certificado-toolbar.component';
import { SolicitudCertificadoMainComponent } from './solicitud-certificado-main/solicitud-certificado-main.component';
import { SolicitudCertificadoBusquedaComponent } from './solicitud-certificado-busqueda/solicitud-certificado-busqueda.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SolicitudCertificadoListaComponent } from './solicitud-certificado-lista/solicitud-certificado-lista.component';
import { SolicitudCertificadoListaCertificadoComponent } from './solicitud-certificado-lista-certificado/solicitud-certificado-lista-certificado.component';
@NgModule({
  declarations: [
    SolicitudCertificadoToolbarComponent,
    SolicitudCertificadoMainComponent,
    SolicitudCertificadoBusquedaComponent,
    SolicitudCertificadoListaComponent,
    SolicitudCertificadoListaCertificadoComponent
  ],
  imports: [
    CommonModule,
    CertificateRequestRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class CertificateRequestModule { }
