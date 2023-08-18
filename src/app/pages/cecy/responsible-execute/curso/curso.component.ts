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
    { label: 'Aprobado', value: 'aprobado' },
    { label: 'Terminado', value: 'terminado' },
    //{ label: 'Cerrado', value: 'cerrado' },
  ];
  helpDialogVisible: boolean = false;
  searchTerm: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(
    private cursoService: CursoService,
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
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      }
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
    this.sortCourses();
  }

  sortCourses() {
    this.cursos.sort((a, b) => {
      const dateA = new Date(a.detailPlanification?.planificationCourse.startDate);
      const dateB = new Date(b.detailPlanification?.planificationCourse.startDate);

      if (this.sortOrder === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  }

  get startingIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  // Method to get the filtered and sorted courses
  get filteredAndSortedCursos(): any[] {
    return this.filterCoursesByName(this.cursos, this.searchTerm);
  }

  // Method to get the courses to display on the current page
  get coursesToDisplay(): any[] {
    return this.filteredAndSortedCursos.slice(this.startingIndex, this.startingIndex + this.itemsPerPage);
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
  }
}
