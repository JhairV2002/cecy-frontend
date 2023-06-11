import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  date: Date = new Date();
  dateFormat: string = '';
  greetingMessage: string = '';
  welcome: string = 'Bienvenido';
  user: any;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.userProfile$.subscribe((user: any) => {
      if (user && user.length > 0) {
        this.user = user[0];
        this.setGreetingMessage();
        this.getGender();
      }
    });

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  getGender() {
    const gender = this.user?.gender.genders;
    if (gender === 'masculino') {
      this.welcome = 'Bienvenido';
    } else if (gender === 'femenino') {
      this.welcome = 'Bienvenida';
    } else {
      this.welcome = 'Bienvenido';
    }
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
