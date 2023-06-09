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

  constructor(
    private cursoService: CursoService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) { }

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

  redireccionar(cursoId: number) {
    this.router.navigate([
      `cecy/responsible-execute/notas/estudiante/${cursoId}`,
    ]);
  }
}
