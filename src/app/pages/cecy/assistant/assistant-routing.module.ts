import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReporteListaComponent } from './reporte/reporte-lista/reporte-lista.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ChangePasswordComponent } from '@shared/components/user/change-password/change-password.component';
import { CoursesComponent } from './courses/courses.component';
import { TabsComponent } from '../responsible-course/tabs/tabs.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/visualization/:id', component: TabsComponent },
  { path: 'enrollment-record', component: CoursesComponent },
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
