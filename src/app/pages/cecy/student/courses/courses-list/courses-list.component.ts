import { Component, OnInit } from '@angular/core';
import { CourseHttpService } from '@services/cecy/course-http.service';
import { MessageService } from '@services/core';
import { CatalogueHttpService } from '@services/cecy';
import { PaginatorModel } from '@models/core';
import { PlanificationModel, CatalogueModel } from '@models/cecy';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  selectedCategory: CatalogueModel = {};


  planifications$ = this.courseHttpService.planifications$;
  planification$ = this.courseHttpService.planification$;

  catalogues$ = this.catalogueHttpService.catalogues$;
  catalogue$ = this.catalogueHttpService.catalogue$;

  loaded$ = this.courseHttpService.loaded$;
  paginator$ = this.courseHttpService.paginator$;


  planifications: PlanificationModel[] = [];
  catalogues: CatalogueModel[] = [];

  selectedPlanificationCourse: PlanificationModel = {};

  paginatorController: boolean = false;
  dialogForm: boolean = false; // optional
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  loaded: boolean = true;

  openPlanificationCourse: boolean = false; // optional

  images: string[] = [
    'https://i.imgur.com/FU9IURu.png',
    'https://www.processmaker.com/wp-content/uploads/2021/09/laravel-workflow-tutorial-768x437.png',
    'https://niixer.com/wp-content/uploads/2020/11/javascript.png',
    'https://rosolutions.com.mx/blog/wp-content/uploads/2019/06/1-y6C4nSvy2Woe0m7bWEn4BA.png',
    'https://www.muylinux.com/wp-content/uploads/2017/10/postgresql.png',
    'https://i.blogs.es/a49483/logo-mongodb-tagline-2/1366_2000.png',
    'https://www.afundacion.org/images/fundacion_publicaciones/primeros-auxilios_.jpg',
    'https://www.semana.com/resizer/vINEkhgTl7DRB7PlCIokilZRXXE=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/QMS6HAE4DNHZZA4C7ZRGMRUPSM.jpg'
  ]


  constructor(
    private courseHttpService: CourseHttpService,
    private catalogueHttpService: CatalogueHttpService,
    public messageService: MessageService,
  ) {
    this.paginator$.subscribe(response => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadPlanificationsCoursesByParticipantType();
    this.loadCategories();
  }

  loadCategories(page: number = 1) {
    this.catalogues$ = this.catalogueHttpService.getCatalogues('CATEGORY');
    this.catalogues$.subscribe(response => {
      this.catalogues = response.data;
    });
  }

  loadPlanificationsCoursesByParticipantType(page: number = 1) {
    this.loaded = true;
    this.planifications$ = this.courseHttpService.getPrivateCoursesByParticipantType(page, this.search.value);
    this.planifications$.subscribe(response => {
      this.planifications = response.data;
      this.paginatorController = false;
      this.loaded = false;
    });
  }

  loadPlanificationCoursesByParticipantTypeAndCategory(page: number = 1) {
    this.loaded = true;
    if (this.selectedCategory) {
      this.planifications$ = this.courseHttpService.getPrivateCoursesByParticipantTypeAndCategory(page, this.selectedCategory.id);
      this.planifications$.subscribe(response => {
        this.planifications = response.data;
        console.log(this.planifications);
        this.paginatorController = true;
        this.loaded = false;
      });
    }
  }

  loadPlanificationCourseDetails(planification: PlanificationModel) {
    this.selectedPlanificationCourse = planification;
    this.openPlanificationCourse = true;
  }


  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadPlanificationsCoursesByParticipantType(1);
    }
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    if (this.paginatorController == true) {
      this.loadPlanificationCoursesByParticipantTypeAndCategory(this.paginator.current_page);
    }
    else {
      this.loadPlanificationsCoursesByParticipantType(this.paginator.current_page);
    }
  }

}
