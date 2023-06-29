import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { CursosModule } from './cursos/cursos.module';
import { StudentModule } from './student/student.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, EstudianteRoutingModule, CursosModule, StudentModule],
})
export class EstudianteModule { }
