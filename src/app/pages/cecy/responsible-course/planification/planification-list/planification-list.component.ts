import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { MessageService } from '@services/core';
import { PlanificationHttpService } from '@services/cecy/planification-http.service';
import { ColModel, CourseModel, PaginatorModel, PlanificationModel } from '@models/cecy';
import { Router } from '@angular/router';
import { CourseHttpService } from '@services/cecy';
import { PlanificationKpiModel } from '@models/cecy/planificaton-kpi.model';

@Component({
  selector: 'app-planification-list',
  templateUrl: './planification-list.component.html',
  styleUrls: ['./planification-list.component.scss']
})
export class PlanificationListComponent implements OnInit {

  planifications: PlanificationKpiModel[] = [];
  planifications$ = this.planificationHttpService.planifications$;
  planification$ = this.planificationHttpService.planification$;
  loaded$ = this.planificationHttpService.loaded$;
  paginator$ = this.planificationHttpService.paginator$;
  kpiModel = new PlanificationKpiModel();
  dialogForm: boolean = false;


  selectedPlanifications: PlanificationModel[] = [];
  selectedPlanification: PlanificationModel = {};
  selectedCourse: CourseModel = {};
  cols: ColModel[];
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  items: MenuItem[] = [];

  @Input() courseId: number = 0;

  constructor(
    private planificationHttpService: PlanificationHttpService,
    public messageService: MessageService,
    private router: Router,
  ) {
    this.cols = [
      // { field: 'code', header: 'Código' },
      { field: 'detailSchoolPeriod', header: 'Periodo Lectivo' },
      { field: 'startedAt', header: 'Fecha inicio' },
      { field: 'endedAt', header: 'Fecha finalización' },
      { field: 'state', header: 'Estado' },
    ];

    this.items = [
      {
        label: 'Ver horarios',
        icon: 'pi pi-calendar',
        command: () => {
          this.editPlanification(this.selectedPlanification);
        }
      }
    ];


    this.paginator$.subscribe(response => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadPlanifications(this.paginator.current_page);
  }

  loadPlanifications(page: number = 1) {
    this.planificationHttpService.getPlanificationsByCourse(page,'',this.courseId)
      .subscribe(response => {
        this.planifications = response.data;
        this.kpiModel = new PlanificationKpiModel();
      });
  }

  editPlanification(planification: PlanificationModel) {
    this.router.navigate(['/cecy/responsible-course/horarios/', planification.id]);

  }

  addNeeds(planification: PlanificationModel) {

  }

  showForm(detailPlanification: PlanificationModel = {}) {
    this.selectedPlanification = detailPlanification;
    this.planificationHttpService.selectPlanification(detailPlanification);
    this.dialogForm = true;
  }

  selectPlanification(planification: PlanificationModel) {
    this.selectedPlanification = planification;
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadPlanifications(this.paginator.current_page);
  }
}
