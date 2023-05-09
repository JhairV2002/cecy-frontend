import { Component, Input, OnInit } from '@angular/core';
import { InitialCourseKpiModel } from '@models/cecy';



@Component({
  selector: 'app-initial-course-kpi',
  templateUrl: './initial-course-kpi.component.html',
  styleUrls: ['./initial-course-kpi.component.scss']
})
export class InitialCourseKpiComponent implements OnInit {

  kpiModel: InitialCourseKpiModel = new InitialCourseKpiModel();
  @Input() data$;
  data: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.data$.subscribe(response => {
      this.data = response.data;
      this.setKpi();
    });
  }

  setKpi() {
    this.kpiModel = new InitialCourseKpiModel();
    this.data.forEach((element) => {
      switch (element.state?.code) {
        case 'DEFEATED':
          this.kpiModel.defeated++;
          break;
        case 'TO_BE_APPROVED':
          this.kpiModel.toBeApproved++;
          break;
        case 'APPROVED':
          this.kpiModel.approved++;
          break;
        case 'NOT_APPROVED':
          this.kpiModel.notApproved++;
          break;
        default:
          break;
      }
    });
  }
}
