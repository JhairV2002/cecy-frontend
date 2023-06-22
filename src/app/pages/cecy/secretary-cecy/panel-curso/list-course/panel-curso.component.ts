import { Component, OnInit } from '@angular/core';
import { Course } from '@models/cecy/secretary-cecy';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';

//Prime NG
import { SelectItem } from 'primeng/api';
import { ListReports } from '../certificateReport';
import { CecyCertificateService } from '../cecy-certificate.service';



@Component({
  selector: 'app-panel-curso',
  templateUrl: './panel-curso.component.html'
})
export class PanelCursoComponent implements OnInit {

  constructor(
    private visualizationCoursesService: CecyCertificateService,
    private planificationCourse: PlanificationsCoursesService,

  ) {}

  courses: Course[] = [];
  courseEntity: Course={
    planificationId:0
  }
  courseValidate: Course[] = [];

  //New metod
  reports: ListReports[]=[]
  //prime NG
  // products: Course[] = [];

  // sortOptions: SelectItem[] = [];

  // sortOrder: number = 0;

  //   sortField: string = '';
  ngOnInit(): void {
    this.findAll();





  }




//   onFilter(dv: DataView, event: Event) {
//       dv.filter((event.target as HTMLInputElement).value);
// }


  public findAll(): void {

    ;
    //Lista de reportes
    this.visualizationCoursesService.getviewReports().subscribe((res)=>{
      this.reports=res;
      this.reports.forEach((report)=>{
        this.visualizationCoursesService.findById(report.reportes[0].matriculas.cursoId).subscribe(
          (course)=>{
            this.visualizationCoursesService.getPlanificationById(
              course.planificationId
            ).subscribe(
              (planification)=>{
                report.nameCourse = planification.name
                report.startDate = planification.startDate
                report.finishDate= planification.finishDate


              }
            )

          }
        )

      }

      )

      this.nameCourse();
    })

    ;


    // this.visualizationCoursesService.getviewCourses().subscribe((response: any) => {
    //   this.courses = response;
    //   this.nameCourse();
    //   this.findAllEstudents();
    // });
  }

  // public findAllEstudents(): void {
  //   this.matricula.findAll().subscribe((response) => {
  //     this.solicitudEstudents = response;

  //     // this.buscarPersona();
  //     //this.buscarCurso();
  //     //this.findMatricula();
  //     this.conteo();
  //   });
  // }

  public nameCourse(): void {
    this.courses.forEach(
      (solicitud) => {
        this.planificationCourse.planificationById(
          solicitud.planificationId
        ).subscribe(
          (course) => {
            solicitud.name = course.name
          }
        )
      }
    )
  }

}
