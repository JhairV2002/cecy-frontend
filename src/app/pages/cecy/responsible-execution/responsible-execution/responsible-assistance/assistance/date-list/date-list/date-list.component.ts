import { Component } from '@angular/core';

@Component({
  selector: 'app-date-list',
  templateUrl: './date-list.component.html',
  styleUrls: ['./date-list.component.css']
})
export class DateListComponent {

}

/* persona: Persona[] = [];

ngOnInit() {
  this.findAll();
}

findAll() {
  this.asistenciaPersonaService.getInscriptions().subscribe((res) => {
    this.nombres = res;
    this.nombres.forEach((nombres) => {
      this.asistenciaPersonaService
        .getPerson(nota.estudianteId)
        .subscribe((res) => {
          nota.estudiante = res;
          nota.nombreEstudiante = res.nombres;
          console.log(this.notas);
        });
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }); */