import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterValidationComponent } from './register-validation.component';

const routes: Routes = [{ path: '', component: RegisterValidationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterValidationRoutingModule { }
