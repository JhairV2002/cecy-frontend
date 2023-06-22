import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ReporteListaComponent } from './reporte/reporte-lista/reporte-lista.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'reporte-lista/:id', component:ReporteListaComponent},
  {path: 'reporte', component:ReporteComponent},
  {path: 'certificado', loadChildren:()=>import('./panel-curso/secretary-cecy-certificate.module').then((m)=>m.SecretaryCecyCertificateModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretaryCecyRoutingModule {}
