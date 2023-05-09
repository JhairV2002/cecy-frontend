import { Component, Input, OnInit } from '@angular/core';
import { InitialPlanificationKpiModel } from '@models/cecy';



@Component({
  selector: 'app-initial-planification-kpi',
  templateUrl: './initial-planification-kpi.component.html',
  styleUrls: ['./initial-planification-kpi.component.scss']
})
export class InitialPlanificationKpiComponent implements OnInit {

  kpiModel: InitialPlanificationKpiModel = new InitialPlanificationKpiModel();
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
    this.kpiModel = new InitialPlanificationKpiModel();
    this.data.forEach((element) => {
      switch (element.state?.code) {
        case 'TO_BE_APPROVED':
          this.kpiModel.toBeApproved++;
          break;
        case 'COMPLETED':
          this.kpiModel.completed++;
          break;
        case 'IN_PROCESS':
          this.kpiModel.inProcess++;
          break;
        case 'NOT_APPROVED':
          this.kpiModel.notApproved++;
          break;
        case 'APPROVED':
          this.kpiModel.approved++;
          break;
        case 'CULMINATED':
          this.kpiModel.culminated++;
          break;
        default:
          break;
      }
    });
  }
}
