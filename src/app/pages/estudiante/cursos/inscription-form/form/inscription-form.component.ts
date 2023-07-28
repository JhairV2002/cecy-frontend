import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscription } from '@models/cecy';
import { InscriptionService } from '@services/cecy';
import { AuthService, TokenService } from '@services/auth';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';
import { switchMap } from 'rxjs';
import { CursosService } from '@services/cecy/cursos';
import { Matricula } from '@models/cecy/estudiantes/carreras';
import { Estudiantes } from '@models/cecy/estudiantes/carreras';
import { MatriculaService } from '@services/cecy/matricula.service';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css'],
})
export class InscriptionFormComponent implements OnInit {
  constructor(
    private inscriptionService: InscriptionService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private estudiantesService: EstudiantesService,
    private cursosService: CursosService,
    private matriculaService: MatriculaService,
  ) { }

  // estudiantes$ = this.estudiantesService.obtenerEstudiantes();

  estudianteSeleccionado!: Estudiantes;

  curso$ = this.activatedRoute.paramMap.pipe(
    switchMap((param) =>
      this.cursosService.getCursoById(Number(param.get('id'))),
    ),
  );

  user: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.findById(parseInt(params.get('id')!));
        this.matricula.cursoId = Number(params.get('id')!);
      }
    });
  }

  publicityId = 0;

  initialForm: Inscription = {
    id: 0,
    publicity: null,
    documents: null,
    institutionContact: '',
    otherCourses: '',
    sponsoredCourse: false,
    state: null,
  };

  matricula = {
    id: 0,
    cursoId: 0,
    estadoMatricula: {
      descripcion: 'En espera',
    },
    estadoCurso: {
      descripcion: 'Cursando',
    },
    estudiantes: {
      id: 0,
    },
    formInscription: {},
  };

  save(): void {
    this.activatedRoute.paramMap.subscribe(
      (res) => (this.matricula.cursoId = Number(res.get('id'))),
    );

    this.estudiantesService.estudianteActual.subscribe(
      res => this.matricula.estudiantes.id = res!.id
    )
    this.matricula.formInscription = this.initialForm;
    console.log(this.matricula);

    this.matriculaService.guardarMatricula(this.matricula).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/estudiante/home']);
    });

    // this.inscriptionService.save(this.initialForm).subscribe(() => {
    //   this.initialForm = {
    //     id: 0,
    //     userId: id,
    //     courseId: 1,
    //     publicity: {
    //       id: 0,
    //       nombre: '',
    //       descripcion: '',
    //     },
    //     otherCourses: '',
    //     sponsoredCourse: false,
    //     institutionContact: '',
    //     state: {
    //       id: 1,
    //       nombre: '',
    //       descripcion: '',
    //     },
    //   };
    //   this.router.navigate(['/cecy/student/courses-list']);
    // });
  }

  findById(id: number): void {
    this.inscriptionService.findByid(id).subscribe((response) => {
      // this.initialForm = response;
    });
  }

  cancelar(): void { }
}
