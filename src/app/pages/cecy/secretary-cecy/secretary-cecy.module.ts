import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretaryCecyRoutingModule } from './secretary-cecy-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';
import {DataViewModule} from 'primeng/dataview';

// submodules

import { FormsModule } from '@angular/forms';
import { ReporteComponent } from './reporte/reporte.component';
import { HomeComponent } from './home/home.component';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ReporteListaComponent } from './reporte/reporte-lista/reporte-lista.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChartModule } from 'primeng/chart';
import { StyleClassModule } from 'primeng/styleclass';


@NgModule({
  declarations: [
    ReporteComponent,
    HomeComponent,
    ReporteListaComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    SecretaryCecyRoutingModule,
    SharedModule,
    PaginatorModule,
    CardModule,
    TableModule,
      FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        RadioButtonModule,
        InputTextareaModule,
        DropdownModule,
        InputNumberModule,
        DialogModule,
        ChartModule,
  StyleClassModule,
  SkeletonModule,
  DataViewModule
  ],
})
export class SecretaryCecyModule {}
