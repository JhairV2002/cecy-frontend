import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  constructor(
    private router: Router
  ) { }
  @Input() showModal: boolean = true
  @Output() clickClose = new EventEmitter<boolean>();

  registerStudentExterior() {
    this.closeModal();
    setTimeout(() => {
      this.router.navigate(['/register'])
    }, 1000);
  }

  closeModal() {
    this.clickClose.emit(false);
    this.router.navigate(['/login'])
  }

}
