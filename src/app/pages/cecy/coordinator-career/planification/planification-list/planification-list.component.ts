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
  loading = [false];
  planifications$ = this.planificationHttpService.planifications$;
  planification$ = this.planificationHttpService.planification$;
  loaded$ = this.planificationHttpService.loaded$;
  paginator$ = this.planificationHttpService.paginator$;

  selectedPlanifications: PlanificationModel[] = [];
  selectedPlanification: PlanificationModel = {};
  search: FormControl = new FormControl('');
  cols: ColModel[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;
  progressBarDelete: boolean = false;
  paginator: PaginatorModel = {};
  courseId: number;
  courseName: string;

  constructor(
    private planificationHttpService: PlanificationHttpService,
    public messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.cols = [
      { field: 'code', header: 'Código' },
      { field: 'responsibleCourse', header: 'Responsable de planificación' },
      { field: 'detailSchoolPeriod', header: 'Periodo Lectivo' },
      { field: 'startedAt', header: 'Fecha inicio' },
      { field: 'endedAt', header: 'Fecha finalización' },
      { field: 'state', header: 'Estado' },
    ];

    this.items = [
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => {
          this.deletePlanification(this.selectedPlanification);
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

  return(){
    this.router.navigate([`/cecy/coordinator-career/course`]);
  }

  loadPlanifications(page: number = 1, courseId: number) {
    this.planifications$ = this.planificationHttpService.getPlanificationsByCourse(page,this.search.value,courseId);
    this.planifications$.subscribe(response=>{this.courseName=response.data[0].course.name});
    this.loading[0] = true;
    setTimeout(() => (this.loading[0] = false), 1000);
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
          this.planificationHttpService.destroyPlanification(ids).subscribe(
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
