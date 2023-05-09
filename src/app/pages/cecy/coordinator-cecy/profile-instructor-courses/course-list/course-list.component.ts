import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Paginator } from 'primeng/paginator';



import { CourseHttpService } from '@services/cecy';
import { CoreHttpService, MessageService } from '@services/core';
import { CareerModel, ColModel, PaginatorModel } from '@models/core';
import { CourseModel } from '@models/cecy';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courses$ = this.courseHttpService.courses$;
  user$ = this.courseHttpService.course$;
  loaded$ = this.courseHttpService.loaded$;
  paginator$ = this.courseHttpService.paginator$;
  dialogList: boolean = false;
  dialogPerfilForm:boolean=false;


  selectedCourses: CourseModel[] = [];
  selectedCourse: CourseModel = {};
  cols: ColModel[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;

  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};

  public careers: CareerModel[] = [];
  career: FormControl = new FormControl('');

  

  constructor(private courseHttpService: CourseHttpService,
    public messageService: MessageService,
    private router: Router,
    private coreHttpService: CoreHttpService,

  ) {
    this.cols = [
      { field: 'code', header: 'Código curso' },
      { field: 'name', header: 'Nombre curso' },
      { field: 'state', header: 'Estado' },
      //{ field: 'career', header: 'Career' },
      { field: 'duration', header: 'Duración en horas' },
      { field: 'instructor', header: 'Instructor' },



    ];
    this.items = [
      {
        label: 'Asignar Instructores',
        icon: 'pi pi-user',
        command: () => {
          this.assignInstructors(this.selectedCourse);
        }
      },

      //{
     //   label: 'Agregar Perfil',
      //  icon: 'pi pi-plus',
      //  command: () => {
      //    this.showForm(this.selectedCourse);
      //  }
     //},

      {
        label: 'Mostrar Perfil',
        icon: 'pi pi-eye',
        command: () => {
          this.showPerfilForm(this.selectedCourse);
        }
      },
    ];

    this.paginator$.subscribe(response => {
      this.paginator = response;
    });

  }

  ngOnInit(): void {
    this.loadCourses();
  }

  assignInstructors(course: CourseModel) {
    this.selectedCourse = course;
    this.courseHttpService.selectCourse(course);
    this.dialogList = true;
  }

  loadCourses(page: number = 1) {
    this.courses$ = this.courseHttpService.getCourseList(page, this.search.value);
  }

  showForm(course: CourseModel = {}) {
    this.selectedCourse = course;
    this.courseHttpService.selectCourse(course);
    this.dialogForm = true;
  }
  showPerfilForm(course: CourseModel = {}) {
    this.selectedCourse = course;
    this.courseHttpService.selectCourse(course);
    this.dialogPerfilForm = true;
    //console.log(course);
  }

  deleteCourse(user: CourseModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.courseHttpService.deleteCourse(user.id!).subscribe(
            response => {
              this.messageService.success(response);
            },
            error => {
              this.messageService.error(error);
            }
          );
        }
      });
  }

  deleteCourses() {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          const ids = this.selectedCourses.map(element => element.id);
          this.progressBarDelete = true;
          this.courseHttpService.deleteCourses(ids).subscribe(
            response => {
              this.progressBarDelete = false;
              this.messageService.success(response);
            },
            error => {
              this.progressBarDelete = false;
              this.messageService.error(error);
            }
          );
        }
      });
  }

  goToPlanifications(course: CourseModel) {
    this.router.navigate(['/cecy/coordinator-cecy/planification/course/', course.id]);
  }



  selectCourse(course: CourseModel) {
    this.selectedCourse = course;
  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadCourses(this.paginator.current_page);
    }
  }
  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadCourses(this.paginator.current_page);
  }
}
