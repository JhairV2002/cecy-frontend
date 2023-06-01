import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SharedModule } from '@shared/shared.module';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CmbGenderComponent } from './register-user/cmb-gender/cmb-gender.component';
import { CmbEtniaComponent } from './register-user/cmb-etnia/cmb-etnia.component';
import { CmbInstructionComponent } from './register-user/cmb-instruction/cmb-instruction.component';
import { CmbEconomyComponent } from './register-user/cmb-economy/cmb-economy.component';
import { CmbInstPlaceComponent } from './register-user/cmb-inst-place/cmb-inst-place.component';
import { CmbInstitutionComponent } from './register-user/cmb-institution/cmb-institution.component';

@NgModule({
  declarations: [
    LoginComponent,
    RecoveryPasswordComponent,
    RegisterUserComponent,
    ChangePasswordComponent,
    CmbGenderComponent,
    CmbEtniaComponent,
    CmbInstructionComponent,
    CmbEconomyComponent,
    CmbInstPlaceComponent,
    CmbInstitutionComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
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
    CheckboxModule,
  ],
})
export class AuthenticationModule {}
