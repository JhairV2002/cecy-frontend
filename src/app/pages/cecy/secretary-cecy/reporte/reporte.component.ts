import { Component, OnInit } from '@angular/core';
import { VisualizationCoursesService } from '@services/cecy/secretary-cecy';
import { Course } from '@models/cecy/secretary-cecy';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';
import { SolicitudCertificadoService } from '../solicitud-certificado/solicitud-certificado.service';
import { Matricula } from '../solicitud-certificado/solicitud-certificado';



@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
})
export class ReporteComponent implements OnInit {

  constructor(
    private visualizationCoursesService: VisualizationCoursesService,
    private planificationCourse: PlanificationsCoursesService,
    private matricula: SolicitudCertificadoService
  ) { }
  solicitudEstudents: Matricula[] = [];
  courses: Course[] = [];
  ngOnInit(): void {
    this.findAll();
  }
  public findAll(): void {
    this.visualizationCoursesService.getviewCourses().subscribe((response: any) => {
      this.courses = response;
      this.nameCourse();
      this.findAllEstudents();
    });
  }

  public findAllEstudents(): void {
    this.matricula.findAllReport().subscribe((response) => {
      this.solicitudEstudents = response;
      this.findAllMatriculados();
    });
  }

  public nameCourse(): void {
    this.courses.forEach(
      (solicitud) => {
        this.planificationCourse.planificationById(
          solicitud.planificationId
        ).subscribe(
          (course) => {
            solicitud.name = course.name;
          }
        )
      }
    )
  }

  public findAllMatriculados(): void {

    this.courses.forEach((solicitud)=>{
         var contador = 0;
         this.solicitudEstudents.forEach(
        (reporte) => {
          if (reporte.cursoId == solicitud.id) {
            contador=contador+1;
            solicitud.list=contador
          }

          }
      )

    })

  }
}
