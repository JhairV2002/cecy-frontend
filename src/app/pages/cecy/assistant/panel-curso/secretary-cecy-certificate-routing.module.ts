import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelCursoComponent } from './list-course/panel-curso.component';

const routes: Routes = [
  { path: '', redirectTo: 'visualization-courses', pathMatch: 'full' },
  { path: 'visualization-courses', component: PanelCursoComponent },
  {
    path: 'list-certificate/:id',
    loadChildren: () =>
      import('../solicitud-certificado/certificate-request.module').then(
        (m) => m.CertificateRequestModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretaryCecyCertificateRoutingModule {}
