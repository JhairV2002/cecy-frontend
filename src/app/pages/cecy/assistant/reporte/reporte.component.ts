import { Component, OnInit } from '@angular/core';
import { VisualizationCoursesService } from '@services/cecy/assistant';
import { Course } from '@models/cecy/secretary-cecy';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';
import { ReporteService } from './reporte.service';
import { Matricula } from './reporte';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
})
export class ReporteComponent implements OnInit {
  constructor(
    private visualizationCoursesService: VisualizationCoursesService,
    private planificationCourse: PlanificationsCoursesService,
    private matricula: ReporteService
  ) {}
  solicitudEstudents: Matricula[] = [];
  courses: Course[] = [];
  id: number=0;
  loading$ = this.visualizationCoursesService.loading$;
  ngOnInit(): void {
    this.findAll();
  }
  public findAll(): void {
    this.visualizationCoursesService
      .getviewCourses()
      .subscribe((response: any) => {
        console.log('CURSOS TERMINADOS', response);
        this.courses = response;
        this.nameCourse();
        this.findAllEstudents();
      });
  }

  public findAllEstudents(): void {
    this.courses.forEach((res)=>{
      this.matricula.findAllMatricula(res.id).subscribe((response) => {
    
        this.solicitudEstudents = response;
        this.findAllMatriculados();
        console.log("Matriculas:",this.solicitudEstudents)
      });


    });
    
  }

  public nameCourse(): void {
    this.courses.forEach((solicitud) => {
      this.planificationCourse
        .planificationById(solicitud.planificationId)
        .subscribe((course) => {
          console.log('by ID', course);
          solicitud.name = course.name;
        });
    });
  }

  public findAllMatriculados(): void {
    this.courses.forEach((solicitud) => {
      var contador = 0;
      this.solicitudEstudents.forEach((reporte) => {
        if (reporte.cursoId == solicitud.id) {
          contador = contador + 1;
          
          solicitud.list = contador;
          

        }
      });
      console.log("response",solicitud.list)
    });
  }
}
