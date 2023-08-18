import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent {

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
