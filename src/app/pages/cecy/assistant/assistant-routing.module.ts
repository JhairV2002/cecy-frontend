import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReporteListaComponent } from './reporte/reporte-lista/reporte-lista.component';
import { ChangePasswordComponent } from '../../authentication/change-password/change-password.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'certificado',
    loadChildren: () =>
      import('./panel-curso/secretary-cecy-certificate.module').then(
        (m) => m.SecretaryCecyCertificateModule
      ),
  },
  { path: 'reporte-lista/:id', component: ReporteListaComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: 'reporte-lista/:id', component: ReporteListaComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'reporte', component: ReporteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistantRoutingModule {}
