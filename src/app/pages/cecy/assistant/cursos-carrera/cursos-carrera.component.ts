import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CareersService } from '@services/cecy/coordinator-career';
import { CarrerasApi } from '@models/cecy';

@Component({
  selector: 'app-cursos-carrera',
  templateUrl: './cursos-carrera.component.html',
  styleUrls: ['./cursos-carrera.component.css'],
})
export class CursosCarreraComponent implements OnInit {
  curso: CarrerasApi = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private careersService: CareersService,
  ) { }

  ngOnInit(): void {
    this.cursos$.subscribe({
      next: (data: any) => {
        console.log('data', data);
        this.curso = data;
      },
    });
  }
  cursos$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.careersService.getPlanificationsCareers(
        parseInt(params.get('careerId')!),
      ),
    ),
  );

  nombreCarrera$ = this.route.paramMap.pipe(
    map((param) => param.get('nombreCarrera')!),
  );

  viewStudents(planification: any) {
    console.log(planification);
    this.router.navigate([
      `/cecy/assistant-cecy/matricula/career/${planification.careerId}/${planification.name}/course/${planification.id}`,
    ]);
  }
}
