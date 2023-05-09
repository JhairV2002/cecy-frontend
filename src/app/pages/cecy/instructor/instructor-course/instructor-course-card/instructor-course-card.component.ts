import { Component, OnInit } from '@angular/core';
import { CourseModel, DetailPlanificationModel, PlanificationModel, SchoolPeriodModel, TopicModel } from "@models/cecy";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AttendanceHttpService,
  CourseHttpService,
  DetailPlanificationHttpService,
  SchoolPeriodHttpService,
  TopicHttpService
} from '@services/cecy';
import { MenuItem } from 'primeng/api';
import { PaginatorModel } from "@models/core";
import { FormControl } from "@angular/forms";
@Component({
  selector: 'app-instructor-course-card',
  templateUrl: './instructor-course-card.component.html',
  styleUrls: ['./instructor-course-card.component.scss']
})
export class InstructorCourseCardComponent implements OnInit {

  detailPlanifications: DetailPlanificationModel[] = [];
  detailPlanifications$ = this.detailPlanificationHttpService.detailPlanifications$;

  selectedTopic: TopicModel = {};
  selectedCourse: number;
  selectedCourses: CourseModel[] = [];

  dialogForm: boolean = false; // optional
  items: MenuItem[] = []; // optional
  detailPlanificationId: number
  idCourse = this.route.snapshot.params['id'];

  search: FormControl = new FormControl('');
  cols: any[];
  course: number

  periods: SchoolPeriodModel[] = [];
  selectedPeriods: string = '';
  value1: string = '';
  paginator: PaginatorModel = {};
  rowData: any;
  courseId: any;


  constructor(
    private courseHttpService: CourseHttpService,
    private detailPlanificationHttpService: DetailPlanificationHttpService,
    private router: Router,
    private topicHttpService: TopicHttpService,
    private schoolPeriodHttpService: SchoolPeriodHttpService,
    private attendanceHttpService: AttendanceHttpService,
    private route: ActivatedRoute) {
    this.items = [
      {
        label: 'Registro fotografico',
        icon: 'pi pi-camera',
        command: () => {
          this.download(this.rowData)

        }
      },
      {
        label: 'Registro de Asistencias',
        icon: 'pi pi-user',
        //routerLink: ['/cecy/instructor/participant-course/'],
        command: () => {
          this.download2(this.rowData)

        }
      },
    ];
    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'capacity', header: 'Capacidad' },
    ];
  }

  ngOnInit(): void {
    this.loadCourses();
    this.getSchoolPeriods();

  }
  select(valor) {
    this.rowData = valor;
   }

  loadCourses(page: number = 1) {
    this.detailPlanifications$ = this.detailPlanificationHttpService.getInstructorByCourses(page,this.search.value);
    this.detailPlanifications$.subscribe(response => {
      this.detailPlanifications = response.data;
      console.log(this.detailPlanifications);
    });
  }
  getSchoolPeriods() {
    this.schoolPeriodHttpService.getSchoolPeriods().subscribe(response => {
      console.log(response.data);
      this.periods = response.data
    })
  }
  redirectParticipants(detailPlanificationId: number) {
    this.router.navigate(['/cecy/instructor/participant-course/', detailPlanificationId]);
  }
  redirectTopics(courseId: number) {
    this.router.navigate(['/cecy/instructor/temari-courses/', courseId]);
  }

  selectCourse(course: TopicModel) {
    this.selectedTopic = course;
  }
  download(course: number) {
      this.attendanceHttpService.downloadPhotographicRecord(course);
    console.log('descarga de datos ')
  }
  download2(course: number) {
    this.attendanceHttpService.downloadatendanceEvaluation(course);
    //console.log (this.rowData);
  }
  filter(event: any) {
    if (event.key === 'Enter' || event.name === 'click') {
      this.loadCourses(1);
    }
  }
}
