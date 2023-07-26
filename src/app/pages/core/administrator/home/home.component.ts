import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  // Doughnut
  doughnutChartLabels: any[] = [];
  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
