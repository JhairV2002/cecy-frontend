import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from '@shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/tooltip';
import { OrderListModule } from 'primeng/orderlist';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { ResponsibleCecyRoutingModule } from './responsible-cecy-routing.module';
import { ResponsibleCecyComponent } from './responsible-cecy.component';
import { DetailPlanificationsComponent } from './detail-planifications/detail-planifications.component';
import { PlanificationsComponent } from './planifications/planifications.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    ResponsibleCecyComponent,
    DetailPlanificationsComponent,
    PlanificationsComponent,
    HomeComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    ResponsibleCecyRoutingModule,
    CardModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    InputSwitchModule,
    PaginatorModule,
    PanelModule,
    TooltipModule,
    FieldsetModule,
    OrderListModule,
    ProgressBarModule,
    ReactiveFormsModule,
    RippleModule,
    SharedModule,
    SplitButtonModule,
    ToolbarModule,
    ImageModule,
    TableModule,
    ToastModule,
    CalendarModule,
    InputTextareaModule,
    ChipModule,
    DividerModule,
    ToggleButtonModule,
  ],
})
export class ResponsibleCecyModule {}
