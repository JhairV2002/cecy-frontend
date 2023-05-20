import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterValidationRoutingModule } from './register-validation-routing.module';
import { RegisterValidationComponent } from './register-validation.component';


@NgModule({
  declarations: [
    RegisterValidationComponent,
  ],
  imports: [
    CommonModule,
    RegisterValidationRoutingModule
  ]
})
export class RegisterValidationModule { }
