import { CourseService } from './../../../../services/cecy-v1/course.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService as CoreMessageService } from './../../../../services/core/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { PlanificationsCoursesService } from '../../../../services/cecy/coordinator-career/planifications-courses.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, OnChanges {
  allCourses: any;
  selectedCourse: any;
  courseId: any;
  progressBar: boolean = false;
  visible: boolean = false;

  formImage = this.fb.group({
    image: [null, Validators.required],
  });
  filterPlan: any;
  fillCourseSelect: any;


  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private planificationCourseService: PlanificationsCoursesService,
    private authService: AuthService,
    public messageService: CoreMessageService,
    public fb: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private primeMessageService: MessageService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void {
    this.getPlanificationById();
  }


  getPlanificationById() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.planificationCourseService
        .planificationById(id)
        .subscribe((data) => {
          this.selectedCourse = data;
          console.log('selected course target', this.selectedCourse.course.targetGroups)
          if (this.selectedCourse.course.targetGroups == null) {
            this.reviewPlan(this.selectedCourse.name)
          }
        });
    }
  }


  showDialog() {
    this.visible = true;
  }

  onSubmit() {
    if (this.formImage.valid) {
      this.saveImage();
      this.getPlanificationById();
      this.visible = false
    } else {
      this.formImage.markAllAsTouched();
    }
  }

  saveImage() {
    this.courseId = this.selectedCourse.course.id;
    const valuesFormGeneralInformation = this.formImage.value;
    this.courseService.update(valuesFormGeneralInformation, this.courseId).subscribe({
      next: (data) => {
        this.messageService.successCourse(data);
      },
      error: (error) => {
        this.messageService.error(error);
      },
    });
  }


  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters
  get imageField() {
    return this.formImage.controls['image'];
  }


  confirmationDialog() {

    this.confirmationService.confirm({
      message: 'Mira tu ya has llenado una planificacion similar. ¿Deseas autocompletar con esa misma información ?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.courseService.updateByAfterCourse(this.fillCourseSelect, this.selectedCourse.id).subscribe({
          next: (data) => {
            this.primeMessageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Curso actualizado correctamente.' });
            this.ngOnInit();
          },
          error: (error) => {
            this.primeMessageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error.' });
          },
        });
        // this.primeMessageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.primeMessageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Lo has rechazado' });
            break;
          case ConfirmEventType.CANCEL:
            this.primeMessageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Lo has cancelado' });
            break;
        }
      },
      key: 'positionDialog'
    });
  }

  reviewPlan(nameCourse: string) {
    console.log('esta pasando por review plan')
    this.authService.getPlanificationsbyUser().subscribe((data: any) => {
      this.filterPlanification(nameCourse, data);
    });
  }

  filterPlanification(valueSearch: any, valueList: any): void {
    // console.log('valores de la lista', valueList);
    // console.log('nombre del curso a buscar', valueSearch);


    const filterValue = valueSearch.toLowerCase();
    this.filterPlan = valueList.filter((item: any) =>
      item.planification.name.toLowerCase().includes(filterValue) && item.planification.state == 'aprobado'
    );
    // console.log('valores ya filtrados',this.filterPlan)
    // this.fillCourseSelect = this.filterPlan.length > 0 ? this.filterPlan[0] : null;`
    if (this.filterPlan.length > 0 && this.filterPlan[0].targetGroups!=null) {
      this.fillCourseSelect = this.filterPlan[0]
    }

    // console.log('valor ya almacenado del filtro el seleccionado para copiar',this.fillCourseSelect)
    if (this.fillCourseSelect) {
      this.confirmationDialog();
    }
  }


}


