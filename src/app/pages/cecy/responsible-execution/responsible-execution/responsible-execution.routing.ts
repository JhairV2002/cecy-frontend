
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResponsibleExecutionModule } from './responsible-execution.module';
import { ResponsibleExecutionComponent } from './responsible-execution.component';


const routes: Routes = [
  { path: '', component: ResponsibleExecutionComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class ResponsibleExecutionRoutingModule { }