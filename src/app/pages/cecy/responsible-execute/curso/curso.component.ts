import { Component, OnInit } from '@angular/core';
import { CursoService } from './curso.service';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { StatusOption } from './curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
})
export class CursoComponent implements OnInit {
  cursos: any[] = [];
  loading: boolean = true;
  statusOptions: StatusOption[] = [
    { label: 'En proceso', value: 'proceso' },
    { label: 'Terminado', value: 'terminado' },
    { label: 'Cerrado', value: 'cerrado' },
    // { label: 'Aprobado', value: 'aprobado' },
  ];
  helpDialogVisible: boolean = false;
  searchTerm: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private cursoService: CursoService,
    private router: Router,
    private authService: AuthService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user: any) => {
      console.log('USUARIO INSTRUCTOR', user[0].id);
      this.cursoService.getCursosByInstructor(user[0].id).subscribe(
        (cursos) => {
          console.log('CURSOS ASIGANDOS INSTRUCOTR', cursos);
          this.cursos = cursos;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    });
  }

  redirect(id: number) {
    console.log('ID COURSE', id);
    this.router.navigate([
      `cecy/responsible-execute/course/${id}/notes/students`,
    ]);
  }

  actualizarStatus(event: any, curso: any) {
    const cursoId = curso.detailPlanification?.planificationCourse?.course?.id;
    console.log({
      event,
      cursoId,
    });
    this.cursoService.actualizarStatusCurso(cursoId, event.value).subscribe({
      next: (data:any) => {
        console.log(data)
        this.messageService.add({
          severity: 'success',
          summary: `${data.message}`,
          detail:
          `${data.state}`,
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al actualizar',
          detail:
          `${error.message}`,
        });
      },
    });
  }

  showHelp() {
    this.helpDialogVisible = true;
  }

  filterCoursesByName(cursos: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return cursos;
    }
    const filteredCursos = cursos.filter(
      (curso) =>
        curso.detailPlanification?.planificationCourse?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    const sortedCursos = filteredCursos.sort((a, b) => {
      const dateA = new Date(a.detailPlanification?.planificationCourse.startDate);
      const dateB = new Date(b.detailPlanification?.planificationCourse.startDate);
      if (this.sortOrder === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
    return sortedCursos;
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

}
