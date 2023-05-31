import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { PlanificationModel, CourseModel } from '@models/cecy';
import { ColModel, PaginatorModel } from '@models/core';
import { CourseHttpService, PlanificationHttpService } from '@services/cecy';
import { MessageService } from '@services/core';


@Component({
  selector: 'app-planification-list',
  templateUrl: './planification-list.component.html',
  styleUrls: ['./planification-list.component.scss']
})
export class PlanificationListComponent implements OnInit {
  planifications: PlanificationModel[] = [];
  loaded$ = this.courseHttpService.loaded$;
  paginator$ = this.courseHttpService.paginator$;

  selectedPlanifications: PlanificationModel[] = [];
  selectedPlanification: PlanificationModel = {};
  cols: ColModel[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  courseId: number = 0;

  constructor(
    private planificationHttpService: PlanificationHttpService,
    private courseHttpService: CourseHttpService,
    public messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.cols = [
      { field: 'startedAt', header: 'Fecha inicio' },
      { field: 'endedAt', header: 'Fecha finalización' },
      { field: 'state', header: 'Estado' },
      { field: 'responsibleCecy', header: 'Responsable del CECY' },
      { field: 'observation', header: 'Observaciones' },
    ];

    this.items = [
      {
        label: 'Asignar responsable de CECY',
        icon: 'pi pi-user',
        command: () => {
          this.assignResponsibleCecy(this.selectedPlanification);
        }
      }
    ];

    this.paginator$.subscribe(response => {
      this.paginator = response;
    });

    this.courseId = this.activatedRoute.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.loadPlanifications(this.paginator.current_page, this.courseId);
  }

  loadPlanifications(page: number = 1, courseId: number) {
    this.courseHttpService.getPlanifications(page, this.search.value, courseId)
      .subscribe(
        response => {
          this.planifications = response.data;
        });
  }

  showForm(planification: PlanificationModel = {}) {
    this.selectedPlanification = planification;
    this.planificationHttpService.selectPlanification(planification);
    this.dialogForm = true;
  }

  deletePlanification(planification: PlanificationModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.planificationHttpService.deletePlanification(planification.id!).subscribe(
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

  deletePlanifications() {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          const ids = this.selectedPlanifications.map(element => element.id);
          this.progressBarDelete = true;
          this.planificationHttpService.destroyPlanification(ids)
            .subscribe(
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

  assignResponsibleCecy(planification: PlanificationModel) {
    this.selectedPlanification = planification;
    this.planificationHttpService.selectPlanification(planification);
    this.dialogForm = true;
  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadPlanifications(1, this.courseId);
    }
  }

  selectPlanification(planification: PlanificationModel) {
    this.selectedPlanification = planification;
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadPlanifications(this.paginator.current_page, this.courseId);
  }
}
