import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EstudianteService } from './estudiante.service';
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent  implements OnInit  {  
  constructor(
    private router: Router,
    private estudianteService : EstudianteService
    
  ) {
  }
  
  ngOnInit(): void {
    this.estudianteService.obtenerEstudiantes().subscribe(res=>this.estudiantes=res)
  
  }

  estudiantes: any[] = [] ;

  redireccionar() {
    this.router.navigate(["cecy/responsible-execute/asistencia"]);
  }
  
  
} 