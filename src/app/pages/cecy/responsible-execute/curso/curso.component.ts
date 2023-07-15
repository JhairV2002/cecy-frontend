/* // curso.component.ts
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
})
export class CursoComponent implements OnInit {
  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  filtroNombre: string = '';
  ascendingOrder: boolean = true;

  constructor(
    private cursoService: CursoService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe((cursos) => {
      this.cursos = cursos;
      this.filtrarCursos();
    });
  }

  filtrarCursos(): void {
    if (this.filtroNombre.trim() !== '') {
      this.cursosFiltrados = this.cursos.filter(
        (curso) =>
          curso.planification.name
            .toLowerCase()
            .includes(this.filtroNombre.toLowerCase()) ||
          curso.planification.codeCourse
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
        ? a.planification.name.localeCompare(b.planification.name)
        : b.planification.name.localeCompare(a.planification.name)
    );
    this.ascendingOrder = !this.ascendingOrder;
  }

  redireccionar(cursoId: number) {
    this.router.navigate(['cecy/responsible-execute/notas/estudiante', cursoId ]);
  }
}
 */
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { User } from '@models/authentication';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
})
export class CursoComponent implements OnInit {
  cursos: any[] = [];
  cursosFiltrados: Curso[] = [];
  filtroNombre: string = '';
  ascendingOrder: boolean = true;

  constructor(
    private cursoService: CursoService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      if (user !== null) {
        console.log('USUARIO INSTRUCTOR', user[0].id);
        this.cursoService
          .getCursosByInstructor(user[0].id)
          .subscribe((cursos) => {
            console.log('CURSOS ASIGANDOS INSTRUCOTR', cursos);
            this.cursos = cursos;
            // Filtrar los cursos por estado "aprobado"
            //TOCA AGREGAR ESE MISMO FILTRO EN LA PARTE DEL BACKEND YA LO HAGO ... ANDERSON
            // this.cursos = cursos.filter(
            //   (curso) => curso.planificationCourse.state === 'aprobado'
            // );
          });
      }
    });
  }

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
}
