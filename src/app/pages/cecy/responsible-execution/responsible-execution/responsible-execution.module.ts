import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PhotographicRecordComponent } from './responsible-assistance/assistance/photographic-record/photographic-record/photographic-record.component';
import { DateListComponent } from './responsible-assistance/assistance/date-list/date-list/date-list.component';
import { AssistanceComponent } from './responsible-assistance/assistance/assistance.component';


const routes: Routes = [
  {path: 'assistance', component:AssistanceComponent},
  {path: 'date-list', component:DateListComponent},
  {path: 'Photographic-Record', component:PhotographicRecordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class ResponsibleExecutionModule { }
