import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ColModel, DetailPlanificationModel, PaginatorModel, PlanificationModel } from '@models/cecy';
import { MessageService } from '@services/core';
import { PlanificationHttpService, DetailPlanificationHttpService } from '@services/cecy';
import { DetailPlanModel } from '@models/cecy-v1/detailPlan.model';
import { CourseService } from '@services/cecy-v1/course.service';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-detail-planification-list',
  templateUrl: './detail-planification-list.component.html',
  styleUrls: ['./detail-planification-list.component.scss']
})
export class DetailPlanificationListComponent {
  @Output() dialog = new EventEmitter<boolean>();

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
  codeCourse: string='';
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
      { field: 'instructors', header: 'Instructores' },
      { field: 'observation', header: 'Observación' },
      { field: 'state', header: 'Estado' },
    ];

    this.items = [
      {
        label: 'Asignar instructores',
        icon: 'pi pi-user-edit',
        command: () => {
          this.assignInstructors(this.selectedDetailPlanification);
        }
      },
      {
        label: 'Eliminar horario',
        icon: 'pi pi-trash',
        command: () => {
          this.deleteDetailPlanification(this.selectedDetailPlanification);
        }
      }
    ];

    this.paginator$.subscribe(response => {
      this.paginator = response;
    });

    this.planId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadDetailPlanifications();
  }

  loadDetailPlanifications(page: number = 1) {
    this.courseService.getDetailPlans(this.planId)
      .subscribe(
        response => {
          this.detailPlanifications = response;
          this.detailPlanifications;
        }
      );

  }

  showForm(detailPlanification: DetailPlanificationModel = {}) {
    this.dialogForm = true;
    console.log('entro por show')
    console.log('entro por show yd data', detailPlanification)

    detailPlanification.id
      ? this.dialogHeader = 'Editar Horario'
      : this.dialogHeader = 'Crear Horario';

    this.selectedDetailPlan = detailPlanification;

    this.selectedDetailPlanificationId = this.planificationId;
    this.detailPlanificationHttpService.selectDetailPlanification(detailPlanification);

  }

  selectDetailPlanification(detailPlanification: DetailPlanificationModel) {
    this.selectedDetailPlanification = detailPlanification;
  }

  assignInstructors(detailPlanification: DetailPlanificationModel) {
    this.selectedDetailPlanification = detailPlanification;
    this.detailPlanificationHttpService.selectDetailPlanification(detailPlanification);
    this.dialogList = true;
  }

  deleteDetailPlanification(detailPlanification: DetailPlanificationModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.courseService
            .deleteDetailPlan(detailPlanification.id!)
            .subscribe(
              response => {
                this.loadDetailPlanifications();
              },
              error => {
                console.log(error);
                this.messageService.error(error);
              }
            );
        }
      });
  }
  deleteDetailPlanifications(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          const ids = this.selectedDetailPlanifications.map(element => element.id);
          this.progressBarDelete = true;
          this.detailPlanificationHttpService.destroysDetailPlanifications(ids).subscribe(
            response => {
              this.progressBarDelete = false;
              this.messageService.success(response);
              this.loadDetailPlanifications();

            },
            error => {
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
}
