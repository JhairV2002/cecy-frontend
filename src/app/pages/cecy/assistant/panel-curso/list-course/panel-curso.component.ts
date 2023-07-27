import { Component, OnInit } from '@angular/core';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';

//Prime NG
import { SelectItem } from 'primeng/api';
import { 
  ListReports,
  Course
 } from '../certificateReport';
import { CecyCertificateService } from '../cecy-certificate.service';

import { DataView, DataViewLayoutOptions } from 'primeng/dataview';

@Component({
  selector: 'app-panel-curso',
  templateUrl: './panel-curso.component.html',
})
export class PanelCursoComponent implements OnInit {
  constructor(
    private visualizationCoursesService: CecyCertificateService,
    private planificationCourse: PlanificationsCoursesService
  ) {}

  courses: Course[] = [];
  courseEntity: Course = {
    planificationId: 0,
  };
  courseValidate: Course[] = [];
  //New metod
  reports: any[] = [];
  //prime ng
  layout: string = 'list';
  sortOrder: number = 0;
  sortField: string = '';

  loading$ = this.visualizationCoursesService.loading$;

  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    //Lista de reportes
    this.visualizationCoursesService.getviewReports().subscribe((res) => {
      this.reports = res;
      this.reports.forEach((report) => {
        this.visualizationCoursesService
          .findById(report.reportes[0].matriculas.cursoId)
          .subscribe((course) => {
            this.visualizationCoursesService
              .getPlanificationById(course.planificationId)
              .subscribe((planification) => {
                report.nameCourse = planification.name;
                report.startDate = planification.startDate;
                report.finishDate = planification.finishDate;
              });
          });
      });
    });
  }

  public nameCourse(): void {
    this.courses.forEach((solicitud) => {
      this.planificationCourse
        .planificationById(solicitud.planificationId)
        .subscribe((course) => {
          solicitud.name = course.name;
        });
    });
  }
}
