import { Component, OnInit } from '@angular/core';
import { CursosService } from '@services/cecy/cursos';
import { Estudiantes } from '@models/cecy';
import { AuthStudentService } from '@services/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recent: any[] = [];
  loading$ = this.courseService.loading$;
  constructor(
    private courseService: CursosService,
    private authStudentService: AuthStudentService,
    private router: Router
  ) { }


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

  student: Estudiantes | null = null;

  ngOnInit(): void {
    this.startImageTimer();
    this.getRecentCourses();
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

  startImageTimer(): void {
    setInterval(() => {
      this.nextImage();
    }, 5000); // Cambia de imagen cada 5 segundos (ajusta según tu preferencia)
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }


  getRecentCourses() {
    return this.courseService.getAllCoursesByStateApprove().subscribe({
      next: (courses) => {
        console.log(courses);
        this.recent = courses.slice(0, 6);
      },
      error: (error) => { },
    });
  }

  viewCourse(id: number) {
    console.log('click', id);
    this.router.navigate([`estudiante/course/${id}/details`])
  }

}
