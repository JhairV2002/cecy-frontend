import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsListRoutingModule } from './students-list-routing.module';
import { StudentsListComponent } from './students-list.component';
import { StudentsTableComponent } from './students-table/students-table.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TableListInputPipe } from './students-table/table-list-input.pipe';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentsTableComponent,
    TableListInputPipe,
  ],
  imports: [
    CommonModule,
    StudentsListRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
  ],
})
export class StudentsListModule { }
