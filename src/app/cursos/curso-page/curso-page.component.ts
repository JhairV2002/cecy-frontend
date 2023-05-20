import { Component, OnInit } from '@angular/core';
import { CursosService } from '../services/cursos.service';
import { map, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Curso } from '../models';

@Component({
  selector: 'app-curso-page',
  templateUrl: './curso-page.component.html',
  styleUrls: ['./curso-page.component.css'],
})
export class CursoPageComponent implements OnInit {
  constructor(
    private cursosService: CursosService,
    private router: ActivatedRoute
  ) { }

  inputSearch = '';
  checkedGratis = false;
  checkedPago = false;
  cursos: Curso[] = [];

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      if (params.get('nombreCurso')) {
        this.findByNombreCarrera(params.get('nombreCurso')!);
      }
    });
  }

  onChangeFreeCheckbox(e: any) {
    this.checkedPago = false;
  }

  onChangeNonFreeCheckbox(e: any) {
    this.checkedGratis = false;
  }

  nombreCurso$ = this.router.paramMap.pipe(
    map((params) => params.get('nombreCurso'))
  );

  findByNombreCarrera(nombre: string) {
    this.cursosService.getCursosByNombreCarrera(nombre).subscribe((res) => {
      this.cursos = res[0].cursos;
    });
  }
}
