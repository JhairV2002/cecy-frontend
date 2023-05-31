import { Component, Input, OnInit } from '@angular/core';
import { CourseKpiModel } from '@models/cecy';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-course-kpi',
  templateUrl: './course-kpi.component.html',
  styleUrls: ['./course-kpi.component.scss']
})
export class CourseKpiComponent implements OnInit {

  kpiModel: CourseKpiModel = new CourseKpiModel();
  @Input() data$: any;
  data: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.data$.subscribe((response: any) => {
      this.data = response.data;
      this.setKpi();
    });
  }

  setKpi() {
    this.kpiModel = new CourseKpiModel();
    this.data.forEach((element) => {
      switch (element.state?.name) {
        case 'APROBADO':
          this.kpiModel.approved++;
          break;
        case 'POR APROBAR':
          this.kpiModel.toBeApproved++;
          break;
        case 'NO APROBADO':
          this.kpiModel.notApproved++;
          break;
        case 'VENCIDO':
          this.kpiModel.defeated++;
          break;

        default:
          break;
      }
    });
  }
}
