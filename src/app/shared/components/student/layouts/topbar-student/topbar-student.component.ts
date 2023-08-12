import { Component, OnInit } from '@angular/core';
import { AuthStudentService } from '@services/auth';
import { Estudiantes } from '@models/cecy';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-topbar-student',
  templateUrl: './topbar-student.component.html',
  styleUrls: ['./topbar-student.component.css']
})
export class TopbarStudentComponent implements OnInit {
  constructor(
    private authStudentService: AuthStudentService,
    private router: Router,
    private authService: SocialAuthService,
  ) { }
  student: Estudiantes | null = null;
  ngOnInit(): void {
    this.authStudentService.student$.subscribe({
      next: (student: any) => {
        console.log('STUDIANTE', student);
        if (student !== null) {
          this.student = student[0];
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  logout() {
    this.authService.signOut();
    this.authStudentService.logout();
    this.router.navigate(['/login'])
  }
}
