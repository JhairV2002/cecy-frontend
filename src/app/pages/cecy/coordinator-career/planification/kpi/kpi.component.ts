import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css'],
})
export class KpiComponent {
  @Input() planificationCourses: any[] = [];

  constructor() {}

  countPlanifications(state: string): number {
    if (this.planificationCourses) {
      return this.planificationCourses.filter(
        (planification) => planification.state === state
      ).length;
    }
    return 0;
  }
}
