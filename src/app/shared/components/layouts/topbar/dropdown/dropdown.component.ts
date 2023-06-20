import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@models/authentication';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  isOpen: boolean = false;
  user: User | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((data: any) => {
      console.log('cliente global', data[0]);
      this.user = data[0];
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const dropdownElement =
      this.elementRef.nativeElement.querySelector('.dropdown-menu');
    const dropdownClicked = dropdownElement.contains(targetElement);
    if (!dropdownClicked && this.isOpen) {
      this.isOpen = false;
    }
    console.log('ESTADO DROP DESPUES', this.isOpen);
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  onlogout(): void {
    localStorage.removeItem('careerSelected');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
