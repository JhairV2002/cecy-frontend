import { Component, OnInit } from '@angular/core';
import { User } from '@models/authentication';
import { AuthService } from '@services/auth';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  date: Date = new Date();
  dateFormat: string = '';
  greetingMessage: string = '';
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
      this.setGreetingMessage();
    });

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  setGreetingMessage() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      this.greetingMessage = `Buenos días, ${this.user?.names}`;
    } else if (currentHour < 18) {
      this.greetingMessage = `Buenas tardes, ${this.user?.names}`;
    } else {
      this.greetingMessage = `Buenas noches, ${this.user?.names}`;
    }
  }
}
