import { Component, Input, OnInit } from '@angular/core';
import { KpiRegistrationManagementModel } from '@models/cecy';



@Component({
  selector: 'app-kpi-registration-management',
  templateUrl: './kpi-registration-management.component.html',
  styleUrls: ['./kpi-registration-management.component.scss']
})
export class KpiRegistrationManagementComponent implements OnInit {

  kpiModel: KpiRegistrationManagementModel = new KpiRegistrationManagementModel();
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
    this.kpiModel = new KpiRegistrationManagementModel();
    this.data.forEach((element) => {
      switch (element.state?.code) {
        case 'REGISTERED':
          this.kpiModel.registered++;
          break;
        case 'IN_REVIEW':
          this.kpiModel.inReview++;
          break;
        case 'RECTIFIED':
          this.kpiModel.rectified++;
          break;
        case 'SIGNED_UP':
          this.kpiModel.signedUp++;
          break;
        case 'CANCELLED':
          this.kpiModel.cancelled++;
          break;
        default:
          break;
      }
    });
  }
}
