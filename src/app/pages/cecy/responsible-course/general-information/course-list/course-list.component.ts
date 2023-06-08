import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CourseModel } from './../../../../../models/cecy-v1/course.model';
import { CourseService } from './../../../../../services/cecy-v1/course.service';
import { environment } from './../../../../../../environments/environment';
import { MessageService } from '../../../../../services/core/message.service';
import { AuthService } from '@services/auth';
import { PdfCourseService } from '@services/cecy-v1/pdf-course.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [DatePipe],
})
export class CourseListComponent implements OnInit {
  items: MenuItem[] = []; // optional
  selectedPlanification: number = 0;

  public STORAGE_URL: string;
  idCourse: any;
  editing: boolean = false;
  rowData: any;
  filterPlan: any[] = [];
  namePlan: string = '';

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private pdfCourseService: PdfCourseService,
    private datePipe: DatePipe
  ) {
    this.items = [
      {
        label: 'Descargar informe de Necesidades',
        icon: 'pi pi-book',
        command: () => {
          this.downloadGeneralInformation(this.rowData);
        },
      },
      {
        label: 'Descargar Diseño curricular',
        icon: 'pi pi-book',
        command: () => {
          this.downloadCurricularDesign(this.rowData);
        },
      }
    ]

    this.STORAGE_URL = environment.STORAGE_URL;
  }

  ngOnInit(): void {
    this.planificationsAsign();
  }

  allCourses: any[] = [];

  planificationsAsign() {
    this.authService.getPlanificationsbyUser().subscribe((data: any) => {
      console.log('Planificaciones asignadas', data);
      this.allCourses = data;
      this.filterPlan = this.allCourses;
    });
  }

  editCourse(planification: any) {
    this.router.navigate([
      '/cecy/responsible-course/course/edit',
      planification.planification.id,
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


  downloadGeneralInformation(planificationCourse: any) {
    try {
      planificationCourse.planification.startDate = this.datePipe.transform(planificationCourse.planification.startDate, 'dd-MM-yyyy');
      planificationCourse.planification.finishDate = this.datePipe.transform(planificationCourse.planification.finishDate, 'dd-MM-yyyy');
    } catch (error) { }
    this.pdfCourseService.generatePDF(planificationCourse);
  }

  downloadCurricularDesign(planificationCourse: any) {
    try {
      planificationCourse.planification.startDate = this.datePipe.transform(planificationCourse.planification.startDate, 'dd-MM-yyyy');
      planificationCourse.planification.finishDate = this.datePipe.transform(planificationCourse.planification.finishDate, 'dd-MM-yyyy');
    } catch (error) { }
    this.pdfCourseService.generatePDFCurricularDesign(planificationCourse);
  }
}
