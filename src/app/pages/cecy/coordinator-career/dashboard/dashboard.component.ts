import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '@services/layout.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { DashboardService } from './../../../../services/cecy/coordinator-career/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  options: any;
  data: any;
  data1: any;
  data2: any;
  chartOptions: any;
  subscription: Subscription;
  config: AppConfig;
  planificationCourses: [] = [];

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.updateChartOptions();
    this.getPlanificationsCoursesAll();
  }

  getPlanificationsCoursesAll() {
    this.dashboardService.getPlanifications().subscribe((data) => {
      const namePlanification = data.map((data) => data.name);
      const nameCareer = data.map((data) => data.career.name);
      const durationTime = data.map((data) => data.durationTime);
      this.data = {
        labels: namePlanification,
        datasets: [
          {
            data: durationTime,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };
      this.data1 = {
        labels: durationTime,
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };
      this.data2 = {
        labels: namePlanification,
        datasets: [
          {
            data: durationTime,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };
      this.options = {
        title: {
          display: true,
          text: 'My Title',
          fontSize: 16,
        },
        legend: {
          position: 'bottom',
        },
      };
      console.log('Planificaciones de cursos', data);
      this.planificationCourses = data;
    });
  }

  updateChartOptions() {
    this.chartOptions = this.config;
  }
}
