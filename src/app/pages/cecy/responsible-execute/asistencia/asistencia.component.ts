import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from './asistencia.service';
import { Asistencia } from './asistencia.model';
import { map } from 'rxjs';



@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
})
export class AsistenciaComponent implements OnInit {
  constructor (

    private AsistenciaService : AsistenciaService
  ) {}
  ngOnInit(): void {
    this.AsistenciaService.obtenerEstudiantes().subscribe((res)=>(this.estudiantes=res));
  }
  estudiantes: Asistencia[]=[];
  asistencias$=this.AsistenciaService.obtenerEstudiantes().pipe(map((res)=>res.filter((it)=>it.estudiantes!=null)));
  asistencia$=this.AsistenciaService.obtenerEstudiantePorId(4);

  asistencias: Asistencia[] | null = null;

/* ngOnInit() {
  this.asistencias$.subscribe((data) => {
    this.asistencias = data;
  });
} */

}