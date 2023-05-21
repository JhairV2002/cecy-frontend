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
//import { ResponsibleExecutionComponent } from './responsible-execution/responsible-execution/responsible-execution.component';
//import { AssistanceComponent } from './responsible-execution/responsible-execution/responsible-assistance/assistance/assistance.component';
//import { DateListComponent } from './responsible-execution/responsible-execution/responsible-assistance/assistance/date-list/date-list/date-list.component';
//import { PhotographicRecordComponent } from './responsible-execution/responsible-execution/responsible-assistance/assistance/photographic-record/photographic-record/photographic-record.component';

@NgModule({
  declarations: [
    /*ResponsibleExecutionComponent,
    AssistanceComponent,
    DateListComponent,
    PhotographicRecordComponent*/
  ],
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
  providers: [{ provide: Window, useValue: window }],
})
export class CecyModule {}
