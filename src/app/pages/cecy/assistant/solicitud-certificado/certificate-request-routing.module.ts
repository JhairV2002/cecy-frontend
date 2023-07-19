import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudCertificadoMainComponent } from './solicitud-certificado-main/solicitud-certificado-main.component';
import { SolicitudCertificadoListaComponent } from './solicitud-certificado-lista/solicitud-certificado-lista.component';

const routes: Routes = [
  {path: '', redirectTo: 'certificate-main', pathMatch: 'full'},
  {path: 'certificate-main', component:SolicitudCertificadoMainComponent},
  {path: 'certificate-main/:id', component:SolicitudCertificadoMainComponent},
  {path: 'certificate-lista/:id', component:SolicitudCertificadoListaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRequestRoutingModule { }
