import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRequestRoutingModule } from './certificate-request-routing.module';
import { SolicitudCertificadoMainComponent } from './solicitud-certificado-main/solicitud-certificado-main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SolicitudCertificadoListaComponent } from './solicitud-certificado-lista/solicitud-certificado-lista.component';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TabMenuCertificateComponent } from './tab-menu-certificate/tab-menu-certificate.component';
import { TabViewModule } from 'primeng/tabview';
import { CodigoCertificateComponent } from './codigo-certificate/codigo-certificate.component';
import { SettingsCertificateComponent } from './settings-certificate/settings-certificate.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownSettingsComponent } from './settings-certificate/dropdown-settings/dropdown-settings.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
@NgModule({
  declarations: [
    SolicitudCertificadoMainComponent,
    SolicitudCertificadoListaComponent,
    TabMenuCertificateComponent,
    CodigoCertificateComponent,
    SettingsCertificateComponent,
    DropdownSettingsComponent,
  ],
  imports: [
    CommonModule,
    CertificateRequestRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    FileUploadModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TabViewModule,
    AutoCompleteModule,
    CheckboxModule,
    CardModule,
    DividerModule,
  ],
})
export class CertificateRequestModule {}
