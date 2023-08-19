import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '@services/cecy/cursos';
import { map, switchMap } from 'rxjs';
import { AuthStudentService } from '@services/auth';

@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.css'],
})
export class CursoDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private cursoService: CursosService,
    private authStudentService: AuthStudentService,
    private router: Router

  ) { }

  nombreCurso$ = this.route.paramMap.pipe(
    switchMap((param) =>
      this.cursoService
        .getCursoById(parseInt(param.get('id')!))
        .pipe(map((res) => res.planification.name))
    )
  );

  curso$ = this.route.paramMap.pipe(
    switchMap((param) =>
      this.cursoService.getCursoById(parseInt(param.get('id')!))
    )
  );
  goToBack() {
    this.authStudentService.student$.subscribe({
      next: (student: any) => {
        console.log('STUDIANTE', student);
        if (student !== null) {
          this.router.navigate([`estudiante/courses`])
        } else {
          this.router.navigate([`courses`])
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  // cursoContenido$ = this.route.paramMap.pipe(
  //   switchMap((param) =>
  //     this.cursoService
  //       .getCursoByName(param.get('nombreCurso')!)
  //       .pipe(map((res) => res[0].contenidos))
  //   )
  // );
  //
  // cursoResumen$ = this.route.paramMap.pipe(
  //   switchMap((param) =>
  //     this.cursoService
  //       .getCursoByName(param.get('nombreCurso')!)
  //       .pipe(map((res) => res[0].descripcion))
  //   )
  // );
}
