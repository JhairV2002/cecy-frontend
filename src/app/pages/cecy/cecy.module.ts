import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CecyRoutingModule } from './cecy-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SharedModule } from '@shared/shared.module';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { EstudianteService } from './responsible-execute/notas/estudiante.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CecyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    SharedModule,
    DividerModule,
    RippleModule,
    PasswordModule,
    DropdownModule,
  ],
  providers: [{ provide: Window, useValue: window}, EstudianteService],
})
export class CecyModule {}
