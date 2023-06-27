import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReporteComponent } from './reporte/reporte.component';
import { PanelCursoComponent } from './panel-curso/list-course/panel-curso.component';
import { SolicitudCertificadoListaComponent } from './solicitud-certificado/solicitud-certificado-lista/solicitud-certificado-lista.component';
import { SolicitudCertificadoMainComponent } from './solicitud-certificado/solicitud-certificado-main/solicitud-certificado-main.component';
import { ReporteListaComponent } from './reporte/reporte-lista/reporte-lista.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'visualization-courses', component: PanelCursoComponent },
  {path: 'curso-main', component:SolicitudCertificadoMainComponent},
  {path: 'curso-main/:id', component:SolicitudCertificadoMainComponent},
  {path: 'curso-lista/:id', component:SolicitudCertificadoListaComponent},
  {path: 'reporte-lista/:id', component:ReporteListaComponent},
  {path: 'reporte', component:ReporteComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretaryCecyRoutingModule {}
