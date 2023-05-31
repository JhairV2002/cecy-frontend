import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '@services/cecy/cursos';

@Component({
  selector: 'app-curso-page',
  templateUrl: './curso-page.component.html',
})
export class CursoPageComponent {
  constructor(
    private cursosService: CursosService,
    private router: ActivatedRoute
  ) { }

  inputSearch = '';
  checkedGratis = false;
  checkedPago = false;
  cursos$ = this.router.paramMap.pipe(
    switchMap((param) => {
      if (param.get('nombreCarrera') === 'todos') {
        return this.cursosService.getAllCursos();
      }
      return this.cursosService.getCursosByNombreCarrera(
        param.get('nombreCarrera')!
      );
    })
  );
  onChangeFreeCheckbox(e: any) {
    this.checkedPago = false;
  }

  onChangeNonFreeCheckbox(e: any) {
    this.checkedGratis = false;
  }

  nombreCursoApi$ = this.router.paramMap.pipe(
    switchMap((params) =>
      this.cursosService
        .getCarrerasById(parseInt(params.get('id')!))
        .pipe(map((res) => res.name))
    )
  );

  cursosApi$ = this.router.paramMap.pipe(
    switchMap((params) =>
      this.cursosService
        .getCarrerasById(parseInt(params.get('id')!))
        .pipe(map((res) => res.planificationCourse))
    )
  );

}
