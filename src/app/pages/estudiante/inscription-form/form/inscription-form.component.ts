import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Documents, Inscription } from '@models/cecy';
import { DocumentsService, InscriptionService } from '@services/cecy';
import { AuthService, AuthStudentService, TokenService } from '@services/auth';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';
import { switchMap, tap } from 'rxjs';
import { CursosService } from '@services/cecy/cursos';
import { Matricula } from '@models/cecy/estudiantes/carreras';
import { Estudiantes } from '@models/cecy/estudiantes/carreras';
import { MatriculaService } from '@services/cecy/matricula.service';
import { Estudiantes as student } from '@models/cecy';
import { MessageService } from 'primeng/api';
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
    private authStudentService: AuthStudentService,
    private messageService: MessageService,
    private documentsService: DocumentsService
  ) { }

  estudianteSeleccionado!: Estudiantes;

  curso$ = this.activatedRoute.paramMap.pipe(
    switchMap((param) =>
      this.cursosService.getCursoById(Number(param.get('id')))
    ),
    tap((res) => (this.matricula.cursoNombre = res.planification.name))
  );

  user: any;
  student: student | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.findById(parseInt(params.get('id')!));
        this.matricula.cursoId = Number(params.get('id')!);
      }
    });

    this.authStudentService.student$.subscribe({
      next: (student: any) => {
        console.log('STUDIANTE', student);
        if (student !== null) {
          this.student = student;
        }
      },
      error: (error) => {
        console.log(error);
      },
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
    cursoNombre: '',
    estadoMatricula: {
      descripcion: 'En espera',
    },
    estadoCurso: {
      descripcion: 'cursando',
    },
    estudiantes: {
      id: 0,
    },
    formInscription: {},
  };
  documents: Documents = {
    id: 0,
    nombre: '',
    urlArchivo: '',
    fechaSubida: new Date()
  }

  save(): void {
    this.activatedRoute.paramMap.subscribe(
      (res) => (this.matricula.cursoId = Number(res.get('id')))
    );
    this.matricula.estudiantes.id = this.student && this.student.id ? this.student.id : 0;
    console.log('id student', this.matricula.estudiantes.id = this.student && this.student.id ? this.student.id : 0);
    this.matricula.formInscription = this.initialForm;
    console.log(this.matricula);
    this.matriculaService.guardarMatricula(this.matricula).subscribe({
      next: (res) => {
        console.log(res);

        this.messageService.add({
          severity: 'info',
          summary: 'Información',
          detail: 'La matrícula ha sido guardada correctamente',
        });
        setTimeout(() => {
          this.router.navigate(['/estudiante/home']);
        }, 2000);
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se ha podido guardar la matrícula',
        });
      },
    });

  }

  findById(id: number): void {
    this.inscriptionService.findByid(id).subscribe((response) => {
      // this.initialForm = response;
    });
  }

  cancelar(): void { }
}
