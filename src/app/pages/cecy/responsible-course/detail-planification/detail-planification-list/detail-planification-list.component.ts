import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  ColModel,
  DetailPlanificationModel,
  PaginatorModel,
  PlanificationModel,
} from '@models/cecy';
import { MessageService } from '@services/core';
import {
  PlanificationHttpService,
  DetailPlanificationHttpService,
} from '@services/cecy';
import { DetailPlanModel } from '@models/cecy-v1/detailPlan.model';
import { CourseService } from '@services/cecy-v1/course.service';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-detail-planification-list',
  templateUrl: './detail-planification-list.component.html',
  styleUrls: ['./detail-planification-list.component.scss'],
})
export class DetailPlanificationListComponent {
  @Output() dialog = new EventEmitter<boolean>();
  loading$ = this.courseService.loading$

  selectedDetailPlan: any;

  detailPlanifications: DetailPlanModel[] = [];
  loaded$ = this.detailPlanificationHttpService.loaded$;
  paginator$ = this.detailPlanificationHttpService.paginator$;
  selectedDetailPlanifications: DetailPlanificationModel[] = [];
  selectedDetailPlanification: DetailPlanificationModel = {};
  planificationId: any;

  items: MenuItem[] = [];
  cols: ColModel[];
  dialogForm: boolean = false;
  dialogList: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  dialogHeader: string = '';
  planId: any;
  codeCourse: string = '';
  selectedDetailPlanificationId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private detailPlanificationHttpService: DetailPlanificationHttpService,
    public messageService: MessageService,
    private planificationHttpService: PlanificationHttpService,
    private courseService: CourseService
  ) {
    this.cols = [
      { field: 'schedule', header: 'Horario' },
      { field: 'day', header: 'Días' },
      { field: 'classroom', header: 'Aula' },
      { field: 'parallel', header: 'Paralelo' },
      { field: 'observation', header: 'Observación' },
      // { field: 'state', header: 'Estado' },
    ];

    this.items = [
      {
        label: 'Eliminar horario',
        icon: 'pi pi-trash',
        command: () => {
          this.deleteDetailPlanification(this.selectedDetailPlanification);
        },
      },
    ];

    this.paginator$.subscribe((response) => {
      this.paginator = response;
    });

    this.planId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadDetailPlanifications();
  }

  loadDetailPlanifications(page: number = 1) {
    this.courseService.getDetailPlans(this.planId).subscribe((response) => {
      this.detailPlanifications = response;
      this.detailPlanifications;
    });
  }

  showForm(detailPlanification: DetailPlanificationModel = {}) {
    this.dialogForm = true;
    console.log('entro por show');
    console.log('entro por show yd data', detailPlanification);

    detailPlanification.id
      ? (this.dialogHeader = 'Editar Horario')
      : (this.dialogHeader = 'Crear Horario');

    this.selectedDetailPlan = detailPlanification;

    this.selectedDetailPlanificationId = this.planificationId;
    this.detailPlanificationHttpService.selectDetailPlanification(
      detailPlanification
    );
  }

  selectDetailPlanification(detailPlanification: DetailPlanificationModel) {
    this.selectedDetailPlanification = detailPlanification;
  }

  assignInstructors(detailPlanification: DetailPlanificationModel) {
    this.selectedDetailPlanification = detailPlanification;
    this.detailPlanificationHttpService.selectDetailPlanification(
      detailPlanification
    );
    this.dialogList = true;
  }

  deleteDetailPlanification(
    detailPlanification: DetailPlanificationModel
  ): void {
    this.messageService.questionDelete({}).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteDetailPlan(detailPlanification.id!).subscribe(
          (response) => {
            this.loadDetailPlanifications();
          },
          (error) => {
            console.log(error);
            this.messageService.error(error);
          }
        );
      }
    });
  }
  deleteDetailPlanifications(): void {
    this.messageService.questionDelete({}).then((result) => {
      if (result.isConfirmed) {
        const ids = this.selectedDetailPlanifications.map(
          (element) => element.id
        );
        this.progressBarDelete = true;
        this.detailPlanificationHttpService
          .destroysDetailPlanifications(ids)
          .subscribe(
            (response) => {
              this.progressBarDelete = false;
              this.messageService.success(response);
              this.loadDetailPlanifications();
            },
            (error) => {
              this.progressBarDelete = false;
              this.messageService.error(error);
            }
          );
      }
    });
  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadDetailPlanifications(1);
    }
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadDetailPlanifications(this.paginator.current_page);
  }




  calculo() {
    const planificacionCurso = {
      id: 1,
      startDate: "2023-06-01T05:00:00.000Z",
      finishDate: "2023-06-30T05:00:00.000Z",
      workDay: "weekends",
    };

    const startDate = new Date(planificacionCurso.startDate);
    const finishDate = new Date(planificacionCurso.finishDate);
    const workDay = planificacionCurso.workDay;

    const diasLaborables = this.calcularDiasLaborables(startDate, finishDate, workDay);
    console.log("Días laborables:", diasLaborables);
  }

  calcularDiasLaborables(startDate: Date, finishDate: Date, workDay: string): number {
    let diasLaborables = 0;
    const diaInicio = new Date(startDate);
    const diaFin = new Date(finishDate);

    while (diaInicio <= diaFin) {
      const diaSemana = diaInicio.getDay();
      if (this.esDiaLaborable(diaSemana, workDay)) {
        diasLaborables++;
      }
      diaInicio.setDate(diaInicio.getDate() + 1);
    }

    return diasLaborables;
  }

  esDiaLaborable(diaSemana: number, workDay: string): boolean {
    if (workDay === "monday-to-friday") {
      return diaSemana >= 1 && diaSemana <= 5; // De lunes a viernes
    } else if (workDay === "saturday") {
      return diaSemana === 6; // Solo sábado
    } else if (workDay === "sunday") {
      return diaSemana === 0; // Solo domingo
    } else if (workDay === "weekends") {
      return diaSemana === 0 || diaSemana === 6; // Fines de semana (sábado y domingo)
    }

    // Si workDay no coincide con ninguna configuración conocida, se considera que todos los días son laborables
    return true;
  }




  calcularHora(){
    const planificationCourse = {
      id: 1,
      startedTime: "12:12:00",
      endTime: "17:10:00",
    };

    const startTimeParts = planificationCourse.startedTime.split(":");
    const startHours = parseInt(startTimeParts[0]);
    const startMinutes = parseInt(startTimeParts[1]);

    const endTimeParts = planificationCourse.endTime.split(":");
    const endHours = parseInt(endTimeParts[0]);
    const endMinutes = parseInt(endTimeParts[1]);

    const durationHours = endHours - startHours;
    const durationMinutes = endMinutes - startMinutes;

    console.log("Duration: ", durationHours, " hours ", durationMinutes, " minutes");

  }
}
