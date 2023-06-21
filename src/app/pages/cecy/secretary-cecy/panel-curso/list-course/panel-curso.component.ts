import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { PaginatorModel } from '@models/core';
import { VisualizationCoursesService } from '@services/cecy/secretary-cecy';
import { Course } from '@models/cecy/secretary-cecy';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';
import { SolicitudCertificadoService } from '../../solicitud-certificado/solicitud-certificado.service';
import { Matricula } from '../../solicitud-certificado/solicitud-certificado';
@Component({
  selector: 'app-panel-curso',
  templateUrl: './panel-curso.component.html'
})
export class PanelCursoComponent implements OnInit {

  constructor(
    private visualizationCoursesService: VisualizationCoursesService,
    private planificationCourse: PlanificationsCoursesService,
    private matricula: SolicitudCertificadoService
  ) {}
  solicitudEstudents: Matricula[] = [];
  certificadoList: Matricula[] = [];
  courses: Course[] = [];
  courseValidate: Course[] = [];
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
    this.matricula.findAll().subscribe((response) => {
      this.solicitudEstudents = response;

      // this.buscarPersona();
      //this.buscarCurso();
      //this.findMatricula();
      this.conteo();
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

  public conteo(): void {

    this.courses.forEach((solicitud)=>{
         var contador = 0;
         this.solicitudEstudents.forEach(
        (certificado) => {
          if (certificado.cursoId == solicitud.id) {
            contador=contador+1;
            solicitud.list=contador
          }

          }
      )

    })

  }

}
