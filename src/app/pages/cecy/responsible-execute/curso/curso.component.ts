import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
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

  constructor(
    private cursoService: CursoService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user: any) => {
      console.log('USUARIO INSTRUCTOR', user[0].id);
      this.cursoService
        .getCursosByInstructor(user[0].id)
        .subscribe((cursos) => {
          console.log('CURSOS ASIGANDOS INSTRUCOTR', cursos);
          this.cursos = cursos;
          this.filtrarCursos();
          // Filtrar los cursos por estado "aprobado"
          //TOCA AGREGAR ESE MISMO FILTRO EN LA PARTE DEL BACKEND YA LO HAGO ... ANDERSON
          // this.cursos = cursos.filter(
          //   (curso) => curso.planificationCourse.state === 'aprobado'
          // );
          this.loading = false;
        }, () => {
          this.loading = false;
        });
    });
  }

  filtrarCursosPorNombre() {
    if (!this.filtroNombre) {
      this.cursosFiltrados = [...this.cursos];
    } else {
      this.cursosFiltrados = this.cursos.filter(curso =>
        curso.planificationCourse.name.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
  }

  cumpleFiltro(curso: Curso): boolean {
    if (!this.filtroNombre) {
      return true;
    }
    const nombreCurso = curso.planificationCourse.name.toLowerCase();
    const filtro = this.filtroNombre.toLowerCase();
    return nombreCurso.includes(filtro);
  }

  /* filtrarCursos(): void {
    if (this.filtroNombre.trim() !== '') {
      this.cursosFiltrados = this.cursos.filter(
        (curso) =>
          curso.planificationCourse.name
            .toLowerCase()
            .includes(this.filtroNombre.toLowerCase()) ||
          curso.planificationCourse.codeCourse
            .toLowerCase()
            .includes(this.filtroNombre.toLowerCase())
      );
    } else {
      this.cursosFiltrados = this.cursos;
    }
  } */

  filtrarCursos(): void {
    if (this.filtroNombre.trim() !== '') {
      this.cursosFiltrados = this.cursos.filter(
        (curso) =>
          curso.planificationCourse.name
            .toLowerCase()
            .includes(this.filtroNombre.toLowerCase()) ||
          curso.planificationCourse.codeCourse
            .toLowerCase()
            .includes(this.filtroNombre.toLowerCase())
      );
    } else {
      this.cursosFiltrados = this.cursos;
    }
  }

  sortCards() {
    this.cursosFiltrados.sort((a, b) =>
      this.ascendingOrder
        ? a.planificationCourse.name.localeCompare(b.planificationCourse.name)
        : b.planificationCourse.name.localeCompare(a.planificationCourse.name)
    );
    this.ascendingOrder = !this.ascendingOrder;
  }

  redirect(cursoId: number) {
    console.log('ID COURSE', cursoId);
    this.router.navigate([
      'cecy/responsible-execute/notas/estudiante',
      cursoId,
    ]);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.loadCursosPaginados();
  }

  loadCursosPaginados() {
    this.cursosPaginados = this.cursos.slice(this.first, this.first + 3);
  }
}
