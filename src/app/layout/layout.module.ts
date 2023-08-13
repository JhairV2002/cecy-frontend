import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

import { LayoutRoutingModule } from './layout-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '@shared/shared.module';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';

// Prime NG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { WebsiteComponent } from './website/website.component';
import { MenuModule } from 'primeng/menu';

import { WebsiteModule } from '../pages/website/website.module';

@NgModule({
  declarations: [MainComponent, EstudiantesComponent, WebsiteComponent,],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutRoutingModule,
    SidebarModule,
    CardModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    WebsiteModule,
    AvatarModule,
AvatarGroupModule,
MenuModule
  ],
  exports: [MainComponent, WebsiteComponent, EstudiantesComponent],
})
export class LayoutModule { }
