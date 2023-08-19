import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { CourseService } from '@services/cecy-v1/course.service';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';
import { AuthService } from '@services/auth';
import { DatePipe } from '@angular/common';
import { ReportCourseService } from '@services/cecy-v1/report-course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [DatePipe],
})
export class CourseListComponent implements OnInit {
  loading: boolean = false;
  items: MenuItem[] = []; // optional
  selectedPlanification: number = 0;

  public STORAGE_URL: string;
  idCourse: any;
  editing: boolean = false;
  rowData: any;
  filterPlan: any[] = [];
  namePlan: string = '';
  dataReport: any;

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe,
    private reportService: ReportCourseService
  ) {
    this.items = [
      {
        label: 'Descargar informe de Necesidades',
        icon: 'pi pi-book',
        command: () => {
          this.generateReportNeed(this.rowData);
        },
      },
      {
        label: 'Descargar Diseño curricular',
        icon: 'pi pi-book',
        command: () => {
          this.generateReportDesign(this.rowData);

        },
      }

    ];

    this.STORAGE_URL = environment.STORAGE_URL;
  }

  ngOnInit(): void {
    this.planificationsAsign();
  }

  allCourses: any[] = [];

  planificationsAsign() {
    this.loading = true;
    this.authService.getPlanificationsbyUser().subscribe((data: any) => {
      console.log('Planificaciones asignadas', data);
      this.allCourses = data;
      this.filterPlan = this.allCourses;
      this.loading = false;
    });
  }

  editCourse(course: any) {
    this.router.navigate([
      '/cecy/responsible-course/course/edit',
      course.planification.id,
    ]);
  }

  createCourse(course: any) {
    console.log(course);
    this.router.navigate(['/cecy/responsible-course/course/add', course.id]);
  }

  //filter
  filterPlanification(value: any): void {
    const filterValue = value.toLowerCase();
    this.filterPlan = this.allCourses.filter((item) =>
      item.planification.name.toLowerCase().includes(filterValue)
    );
  }

  select(valor: any) {
    this.rowData = valor;
  }




  generateReportNeed(planificationCourse: any) {
    const courseId = planificationCourse.planification.id;
    this.reportService.testGetReport(courseId).subscribe(
      (res) => {
        this.dataReport = res;
        let name = 'Informe de necesidades ' + planificationCourse.planification.name;
        this.reportService.generateReportNeed(courseId).subscribe(
          (data) => {
            let dowloadURL = window.URL.createObjectURL(data);
            let link = document.createElement('a');
            link.href = dowloadURL;
            link.download = name + '.xls';
            link.click();

            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'El informe se generó correctamente.'
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo generar el informe, no se ha llenado toda la planificación.'
            });
          }
        );
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo generar el informe, no se ha llenado toda la planificación.'
        });
      }
    )


  }

  generateReportDesign(planificationCourse: any) {
    const courseId = planificationCourse.planification.id;
    this.reportService.testGetReport(courseId).subscribe(
      (res) => {
        this.dataReport = res;
        let name = 'Informe de necesidades ' + planificationCourse.planification.name;
        this.reportService.generateReportDesign(courseId).subscribe(
          (data) => {
            let dowloadURL = window.URL.createObjectURL(data);
            let link = document.createElement('a');
            link.href = dowloadURL;
            link.download = name + '.xls';
            link.click();

            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'El informe de diseño curricular se generó correctamente.'
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo generar el informe, no se ha llenado toda la planificación.'
            });
          }
        );
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo generar el informe, no se ha llenado toda la planificación.'
        });
      }
    )
  }

}



