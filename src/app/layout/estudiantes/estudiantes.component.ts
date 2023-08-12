// import { RecentCoursesComponent } from './../../pages/website/recent-courses/recent-courses.component';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '@services/cecy/cursos';
import { Observable, tap } from 'rxjs';
import { EstudiantesService } from './estudiantes.service';
import { Estudiantes } from '@models/cecy';
import { AuthStudentService, TokenService } from '@services/auth';


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
  items = [
    {
      items: [
        {
          label: 'Perfil',
          icon: 'pi pi-user',
          command: () => {
            // this.update();
          }
        },
        {
          label: 'Cerrar Sesión',
          icon: 'pi pi-sign-out',
          command: () => {
            this.cerrarSesion()
          }
        }
      ]
    },
  ];

  constructor(
    private cursosService: CursosService,
    private estudiantesService: EstudiantesService,
    private tokenService: TokenService,
    private authStudentService: AuthStudentService
  ) { }

  carreras$ = this.cursosService.getCarreras();

  cursos$ = this.cursosService
    .getCursosByCarrera('all')
    .pipe(tap((_) => console.log('Data Fetched')));

  user: { id: number; nombre: string; url: string } | null = null;

  // TODO: Refactorizar
  estudiantes$ = this.estudiantesService.estudianteActual;

  estudianteSeleccionado!: Estudiantes;

  seleccionarEstudiante(estudiante: Estudiantes) {
    this.estudianteSeleccionado = estudiante;
    console.log(this.estudianteSeleccionado);
  }
  //

  estudiante: Observable<Estudiantes | null> | null =
    this.estudiantesService.estudianteActual;

    ngOnInit(): void {
    this.startImageTimer();
    if (this.tokenService.getEstudianteCedula()) {
      this.estudiantesService.obtenerEstudiantePorCedula(
        this.tokenService.getEstudianteCedula()!
      );
      this.estudiante = this.estudiantesService.estudianteActual;
      return;
    }



  }


  cerrarSesion() {
    this.authStudentService.logout();
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



}
