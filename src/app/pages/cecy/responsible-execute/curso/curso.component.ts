import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { MessageService } from 'primeng/api';

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
    { label: 'Aprobado', value: 'aprobado' },
    { label: 'Terminado', value: 'terminado' },
    { label: 'Cerrado', value: 'cerrado' },
  ];

  constructor(
    private cursoService: CursoService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      if (user !== null) {
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
      }
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
          nombreCurso.includes(filtro) ||
          codigoCurso.includes(filtro) ||
          startDate.includes(filtro)
        );
      });
    } else {
      this.cursosFiltrados = this.cursos;
    }
    this.loadCursosPaginados();
  }

  sortCards() {
    this.cursosFiltrados.sort((a, b) => {
      const dateA = new Date(a.planificationCourse.startDate);
      const dateB = new Date(b.planificationCourse.startDate);
      return this.ascendingOrder
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    this.ascendingOrder = !this.ascendingOrder;
  }

  redirect(id: number) {
    console.log('ID COURSE', id);
    this.router.navigate([
      `cecy/responsible-execute/course/${id}/notes/students`,
    ]);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.loadCursosPaginados();
  }

  loadCursosPaginados() {
    this.cursosPaginados = this.cursosFiltrados.slice(
      this.first,
      this.first + 3
    );
  }

  actualizarStatus(event: any, curso: any) {
    const cursoId = curso.detailPlanification?.planificationCourse?.course?.id;
    console.log({
      event,
      cursoId,
    });
    this.cursoService.actualizarStatusCurso(cursoId, event.value).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.state === 'aprobado') {
          this.messageService.add({
            severity: 'success',
            summary: `${data.message}`,
            detail: `${data.state}`,
          });
        } else if (data.state === 'terminado') {
          this.messageService.add({
            severity: 'warn',
            summary: `${data.message}`,
            detail: `${data.state}`,
          });
        } else if (data.state === 'cerrado') {
          this.messageService.add({
            severity: 'error',
            summary: `${data.message}`,
            detail: `${data.state}`,
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al actualizar',
          detail: `${error.message}`,
        });
      },
    });
  }
}
