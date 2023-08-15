import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
  isModalOpen: boolean = false;
  isVisible: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((data: any) => {
      if (data !== null) {
        this.user = data[0];
      }
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
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  showForm(): void {
    console.log('OPEN PROFILE FORM');
    this.isVisible = true;
  }

  closeModal(state: boolean) {
    console.log('STATE PROFILE FORM', state);
    this.isVisible = state;
  }

  redirectConfigurate(role: any) {
    console.log(role);
    if (role === 'admin') {
      this.router.navigate(['/administrator/change-password']);
    } else if (role === 'coordinator_career') {
      this.router.navigate(['/cecy/coordinator-career/change-password']);
    } else if (role === 'coordinator_cecy') {
      this.router.navigate(['/cecy/coordinator-cecy/change-password']);
    } else if (role === 'assistant_cecy') {
      this.router.navigate(['/cecy/assistant-cecy/change-password']);
    } else if (role === 'instructor_execute') {
      this.router.navigate(['/cecy/responsible-execute/change-password']);
    } else if (role === 'responsible_course') {
      this.router.navigate(['/cecy/responsible-course/change-password']);
    } else if (role === 'instructor') {
      this.router.navigate(['/cecy/instructor/courses/change-password']);
    }
  }

  onlogout(): void {
    localStorage.removeItem('careerSelected');
    this.authService.logout();
    this.router.navigate(['/cecy/login']);

  }
}
