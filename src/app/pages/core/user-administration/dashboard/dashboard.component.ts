import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any;
  // Doughnut
  doughnutChartLabels: any[] = [];
  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userProfile$.subscribe((user: any) => {
      console.log('DASHBOARD USER', user[0]);
      this.user = user[0];
    });
  }
}
