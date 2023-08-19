import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStudentService } from '@services/auth';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent {

  constructor(
    private authStudentService: AuthStudentService,
    private router: Router,
  ) { }

  openModal: boolean = false;
  createAccount() {
    this.openModal = true
    // routerLink="/register"
  }

  closeModal(state: boolean) {
    console.log(state);
    this.openModal = state
  }
}
