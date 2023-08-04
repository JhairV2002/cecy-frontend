import { CourseService } from '@services/cecy-v1/course.service';
import { Component, OnInit } from '@angular/core';
import { MessageService as CoreMessageService } from '@services/core/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career/planifications-courses.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { AuthService } from '@services/auth';
import { Message } from 'primeng/api';
import { User } from '@models/authentication';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
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
  alert: Message[] = [];
  user: User | null = null;

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
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      if (user !== null) {
        console.log('user tab', user);
        this.user = user[0];
      }
    });
    this.getPlanificationById();
  }

  getPlanificationById() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.planificationCourseService
        .planificationById(id)
        .subscribe((data) => {
          console.log('DATA?', data);
          if (data.course.state === 'proceso') {
            this.alert = [
              {
                severity: 'info',
                summary: 'Proceso',
                detail:
                  'El curso actualmente esta en proceso, se necesita completar la informacion del curso para posteriormente aprobarlo por alguna persona encargada del cecy.',
              },
            ];
          } else if (data.course.state === 'aprobado') {
            this.alert = [
              {
                severity: 'success',
                summary: 'Aprobado',
                detail: 'El curso actualmente se encuentra aprobado.',
              },
            ];
          } else if (data.course.state === 'terminado') {
            this.alert = [
              {
                severity: 'warn',
                summary: 'Terminado',
                detail: 'El curso actualmente se encuentra terminado',
              },
            ];
          } else if (data.course.state === 'cerrado') {
            this.alert = [
              {
                severity: 'error',
                summary: 'Cerrado',
                detail: 'El curso se encuentra actualmente cerrado',
              },
            ];
          }
          this.selectedCourse = data;

          console.warn('selected course target', this.selectedCourse);
          if (this.selectedCourse.course.targetGroups == null) {
            this.reviewPlan(this.selectedCourse.name);
          }
        });
    }
  }

  approveCourse() {
    const id = this.activatedRoute.snapshot.params['id'];
    const newStatus = 'aprobado';

    this.planificationCourseService.planificationById(id).subscribe({
      next: (data: any) => {
        const isPlanificationApproved = data.course.state;

        if (isPlanificationApproved) {
          console.log('La planificación ya está aprobada');
          this.primeMessageService.add({
            severity: 'info',
            summary: 'Aprobado',
            detail: 'Ya tiene su curso aprobado.',
          });
        } else {
          this.courseService.updateCourseByState(id, newStatus).subscribe({
            next: (data: any) => {
              console.log('El estado se actualizo', data);
              this.primeMessageService.add({
                severity: 'success',
                summary: `Actualizado`,
                detail: `${data.message}`,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            },
            error: (error) => {
              this.primeMessageService.add({
                severity: 'danger',
                summary: `Error al actualizar`,
                detail: `${error.error}`,
              });
            },
          });
        }
      },
      error: (error) => {
        this.messageService.error(error);
      },
    });
  }
  showDialog() {
    this.visible = true;
  }

  onSubmit() {
    if (this.formImage.valid) {
      this.saveImage();
      this.getPlanificationById();
      this.visible = false;
    } else {
      this.formImage.markAllAsTouched();
    }
  }

  saveImage() {
    this.courseId = this.selectedCourse.course.id;
    const valuesFormGeneralInformation = this.formImage.value;
    this.courseService
      .update(valuesFormGeneralInformation, this.courseId)
      .subscribe({
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
      message:
        'Mira, tu ya has llenado una planificacion similar. ¿Deseas autocompletar con esa misma información ?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.courseService
          .updateByAfterCourse(this.fillCourseSelect, this.selectedCourse.id)
          .subscribe({
            next: (data) => {
              // this.ngOnInit();
              console.warn('curso de seleccion now:', this.selectedCourse);
              this.router.navigate([
                '/cecy/responsible-course/course/add',
                this.selectedCourse.id,
              ]);

              this.primeMessageService.add({
                severity: 'info',
                summary: 'Confirmado',
                detail:
                  'Curso actualizado correctamente, si no se reflejan los datos actualiza la pagina.',
              });
            },
            error: (error) => {
              this.primeMessageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ha ocurrido un error.',
              });
            },
          });
        // this.primeMessageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            // this.primeMessageService.add({ severity: 'warn', summary: 'Rechazado', detail: 'Lo has rechazado' });
            break;
          case ConfirmEventType.CANCEL:
            // this.primeMessageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Lo has cancelado' });
            break;
        }
      },
      key: 'positionDialog',
    });
  }

  reviewPlan(nameCourse: string) {
    console.log('esta pasando por review plan');
    this.authService.getPlanificationsbyUser().subscribe((data: any) => {
      this.filterPlanification(nameCourse, data);
    });
  }

  filterPlanification(valueSearch: any, valueList: any): void {
    console.log('valores de la lista', valueList);
    console.log('nombre del curso a buscar', valueSearch);

    const filterValue = valueSearch.toLowerCase();
    this.filterPlan = valueList.filter(
      (item: any) =>
        item.planification.name.toLowerCase().includes(filterValue) &&
        item.planification.state == 'aprobado' &&
        item.targetGroups != null
    );
    console.log('valores ya filtrados', this.filterPlan);
    if (this.filterPlan.length > 0 && this.filterPlan[0].targetGroups != null) {
      this.fillCourseSelect = this.filterPlan[0];
    }

    console.log(
      'valor ya almacenado del filtro el seleccionado para copiar',
      this.fillCourseSelect
    );
    if (this.fillCourseSelect) {
      this.confirmationDialog();
    }
  }
}
