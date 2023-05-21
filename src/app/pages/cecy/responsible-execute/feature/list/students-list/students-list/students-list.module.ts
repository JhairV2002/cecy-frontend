import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableListInputPipe } from './students-table/students-table/table-list-input.pipe';
import { StudentsListComponent } from './students-list.component';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentsListComponent,
    TableListInputPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
})
export class StudentsListModule { }
