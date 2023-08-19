import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

import { AuthStudentService } from '@services/auth';
import { Estudiantes } from '@models/cecy';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent implements OnInit {
  currentIndex: number = 0;
  images: string[] = [
    'https://img-c.udemycdn.com/notices/web_carousel_slide/image/0d8c97db-5626-4a4d-9af2-56f4da5ad66e.png',
    'https://img-c.udemycdn.com/notices/featured_carousel_slide/image/6b64536b-df32-4651-add8-ee055651b905.jpg',
    'https://img-c.udemycdn.com/notices/featured_carousel_slide/image/3f2025e6-15ca-4823-9ac8-de87281c7838.jpg',
    // Agrega más URL de imágenes según necesites
  ];


  textLabel = [
    {
      title: 'Educación',
      subtitle: 'Mejora tus clases'
    },
    {
      title: 'Administración',
      subtitle: 'Mejora tus controles'
    },
    {
      title: 'Tecnologia',
      subtitle: 'Mejora tus Ingresos'
    },
  ]
  items: MenuItem[] = [
    {
      items: [
        {
          label: 'Perfil',
          icon: 'pi pi-user',
          routerLink: '/estudiante/profile',
          command: () => {
            // this.profile();
          }
        },
        {
          label: 'Cerrar Sesión',
          icon: 'pi pi-sign-out',
          command: () => {
            this.logout()
          }
        }
      ]
    },
  ];

  constructor(
    private authStudentService: AuthStudentService,
    private authService: SocialAuthService,
    private router: Router,
  ) { }

  student: Estudiantes | null = null;

  ngOnInit(): void {
    this.startImageTimer();
    this.authStudentService.getProfileStudent().subscribe();
    this.authStudentService.student$.subscribe({
      next: (student: any) => {
        console.log('STUDIANTE', student);
        if (student !== null) {
          this.student = student;
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

  startImageTimer(): void {
    setInterval(() => {
      this.nextImage();
    }, 5000);
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  viewCourses() {
    console.log('CLICK COURSE');
    if (this.student?.rol === "estudiante") {
      console.log('con rol')
      this.router.navigate([`estudiante/courses`])
    } else if (this.student?.rol === "") {
      console.log('sin rol')
      this.router.navigate([`courses`])
    }
  }
}
