import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { CourseModel } from './../../../../../models/cecy-v1/course.model';
import { CourseService } from './../../../../../services/cecy-v1/course.service';
import { environment } from './../../../../../../environments/environment';
import { MessageService } from '../../../../../services/core/message.service';
import { AuthService } from '@services/auth';
import { Planification } from '@models/cecy/coordinator-career/careers.model';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  items: MenuItem[] = []; // optional
  selectedPlanification: number= 0;

  public STORAGE_URL: string;
  idCourse: any;
  editing: boolean = false;
  rowData: any;

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {
    this.items = [
      {
        label: 'Descargar informe de Necesidades',
        icon: 'pi pi-book',
        command: () => {
          this.download(this.rowData)
        }
      },
      {
        label: 'Descargar Diseño curricular',
        icon: 'pi pi-book',
        command: () => {
          this.download1(this.rowData)


        }
      },
      {
        label: 'Descargar Informe final ',
        icon: 'pi pi-book',
        command: () => {
          this.download2(this.rowData)


        }
      }
    ]

    this.STORAGE_URL = environment.STORAGE_URL;
  }

  ngOnInit(): void {
    this.planificationsAsign();
  }

  allCourses: any[] = [];

  planificationsAsign() {
    this.authService.getPlanificationsbyUser().subscribe((data) => {
      console.log('Planificaciones asignadas', data);
      this.allCourses = data
    });
  }



  // filter(search: string) {
  //   this.courseService.findByName(search).subscribe((res) => {
  //     //this.allCourses = res;
  //   });
  // }
  editCourse(planification: any) {
    this.router.navigate(['/cecy/responsible-course/course/edit', planification.id])
  }

  createCourse(planification: any) {
    /* console.log(planification)
    planification.id= null
    planification.duration = planification.durationTime
    planification.stateId= 96 */
    console.log(planification);
    this.router.navigate(['/cecy/responsible-course/course/add', planification.id])
    /* this.courseService.findByCode(planification.codeCourse).subscribe(
      res=> {
        console.log('entro')
        if (res) {
          this.idCourse= res.id
          this.router.navigate(['/cecy/responsible-course/course', this.idCourse]);
        } else {
          console.log(planification)
          this.courseService.save(planification).subscribe(
            res=>{
              this.idCourse= res.id
              this.router.navigate(['/cecy/responsible-course/course', this.idCourse]);
            },
            error => {
              console.log('error');
            }
          )
        }
      },
      error => {
        console.log('error find');
      }

    ) */


  }

  select(valor: any) { this.rowData = valor }

  download(course: CourseModel) {
    // this.coursesHttpService.downloadReportNeed(course.id);
  }

  download1(planification: any) {
    // this.planificationHttpService.downloadcurricularDesign(planification.id);
  }
  download2(planification: any) {
    // this.planificationHttpService.downloadinformeFinal(planification.id);
  }


}
