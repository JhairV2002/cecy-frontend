import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

interface StatusOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
})
export class CursoComponent implements OnInit {
  cursos: any[] = [];
  cursosFiltrados: Curso[] = [];
  cursosPaginados: Curso[] = [];
  filtroNombre: string = '';
  ascendingOrder: boolean = true;
  loading: boolean = true;
  first = 0;
  statusOptions: StatusOption[] = [
    { label: 'En proceso', value: 'En proceso' },
    { label: 'Terminado', value: 'Terminado' },
    { label: 'Cerrado', value: 'Cerrado' },
  ];

  constructor(
    private cursoService: CursoService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user: any) => {
      console.log('USUARIO INSTRUCTOR', user[0].id);
      this.cursoService.getCursosByInstructor(user[0].id).subscribe(
        (cursos) => {
          console.log('CURSOS ASIGANDOS INSTRUCOTR', cursos);
          this.cursos = cursos;
          this.filtrarCursos();
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    });
    this.loadCursosPaginados();
  }


  filtrarCursosPorNombre() {
    if (!this.filtroNombre) {
      this.cursosFiltrados = [...this.cursos];
    } else {
      this.cursosFiltrados = this.cursos.filter((curso) =>
        curso.planificationCourse.name
          .toLowerCase()
          .includes(this.filtroNombre.toLowerCase())
      );
    }
  }

  cumpleFiltro(curso: Curso): boolean {
    if (!this.filtroNombre) {
      return true;
    }
    const nombreCurso = curso.planificationCourse.name.toLowerCase();
    const filtro = this.filtroNombre.toLowerCase();
    return (
      nombreCurso.includes(filtro) ||
      curso.planificationCourse.codeCourse.toLowerCase().includes(filtro)
    );
  }

  filtrarCursos(): void {
    if (this.filtroNombre.trim() !== '') {
      this.cursosFiltrados = this.cursos.filter((curso) => {
        const nombreCurso = curso.planificationCourse.name.toLowerCase();
        const codigoCurso = curso.planificationCourse.codeCourse.toLowerCase();
        const startDate = curso.planificationCourse.startDate.toLowerCase();
        const filtro = this.filtroNombre.toLowerCase();
        return (
          nombreCurso.includes(filtro) || codigoCurso.includes(filtro) || startDate.includes(filtro)
        );
      });
    } else {
      this.cursosFiltrados = this.cursos;
    };
    this.loadCursosPaginados();
  }

  sortCards() {
    this.cursosFiltrados.sort((a, b) => {
      const dateA = new Date(a.planificationCourse.startDate);
      const dateB = new Date(b.planificationCourse.startDate);
      return this.ascendingOrder ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    this.ascendingOrder = !this.ascendingOrder;
  }

  redirect(cursoId: number) {
    console.log('ID COURSE', cursoId);
    this.router.navigate(['cecy/responsible-execute/notas/estudiante', cursoId]);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.loadCursosPaginados();
  }

  loadCursosPaginados() {
    this.cursosPaginados = this.cursosFiltrados.slice(this.first, this.first + 3);
  }

  actualizarStatus(cursoId: number, nuevoStatus: string) {
    this.cursoService.actualizarStatusCurso(cursoId, nuevoStatus).subscribe(
      () => {
        console.log('El estado del curso se actualizó correctamente.');
      },
      (error) => {
        console.error('Error al actualizar el estado del curso:', error);
      }
    );
  }


}
