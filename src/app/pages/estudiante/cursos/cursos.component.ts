import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';
import { CursosService } from '@services/cecy/cursos';
import { Estudiantes } from '@models/cecy';
import { AuthStudentService } from '@services/auth';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  recent: any[] = [];
  loading$ = this.courseService.loading$;
  constructor(
    private courseService: CursosService,
    private estudiantesService: EstudiantesService,
    private authStudentService: AuthStudentService,
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
          this.student = student[0];
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

}
