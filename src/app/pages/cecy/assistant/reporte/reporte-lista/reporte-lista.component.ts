import { Component, OnInit } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { ActivatedRoute } from '@angular/router';
import { VisualizationCoursesService } from '@services/cecy/assistant';
import { Course } from '@models/cecy/secretary-cecy';
import { Reporte, Reportes, Matricula } from '../reporte';
import { ReporteService } from '../reporte.service';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-lista',
  templateUrl: './reporte-lista.component.html',
})
export class ReporteListaComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private matricula: ReporteService,
    private courseService: VisualizationCoursesService,
    private reporteService: ReporteService,
    private planificationCourse: PlanificationsCoursesService,
    private messageService: MessageService
  ) {}
  solicitudEstudents: Matricula[] = [];
  cursoEstudiantes: Matricula[] = [];
  reporteList: Reporte[] = [];
  courses: Course[] = [];
  validateReportList: Reporte[] = [];
  validateReport: Boolean = false;
  listaMatriculados: Matricula[] = [];
  validateReportEntity: Reporte = {
    id: 0,
    reportes: [],
  };
  course: Course = {
    id: 0,
    name: '',
    image: '',
    planificationId: 0,
  };
  reporteEntity: Reporte = {
    id: 0,
    fechaReporte: new Date(),
    reportes: [],
  };
  cursoEstudiante: Matricula = {
    id: 0,
    cursoId: 0,
    nota1: 0,
    nota2: 0,
    promedio: 0,
  };
  cursoEstudianteLista: Matricula = {};

  cursoMatricula: number = 0;
  reportesList: Reportes[] = [];
  reporteListEntity: Reportes = {
    matriculas: this.cursoEstudiante,
  };
  dialogReport: boolean = false;
  items: MenuItem[] = [];
  home: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      { label: 'Computer' },
      { label: 'Notebook' },
      { label: 'Accessories' },
      { label: 'Backpacks' },
      { label: 'Item' },
    ];

    this.home = [{ icon: 'pi pi-home', routerLink: '/' }];
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.findByIdCourse(parseInt(params.get('id')!));
      }
    });
    this.consulReport();
    this.searchStudentsbyState();
  }

  public findByIdCourse(id: number): void {
    this.cursoMatricula = id;
    this.courseService.findById(id).subscribe((res) => {
      this.course = res;
      this.planificationCourse
        .planificationById(this.course.planificationId)
        .subscribe((planificacion) => {
          this.course.name = planificacion.name;
          console.log(this.course.planificationId);
          console.log(planificacion.name);
        });
    });
  }
  public searchStudentsbyState(): void {
    var totalAprobados = 0;
    var totalReprobados = 0;

    this.matricula
      .findAllMatricula(this.cursoMatricula)
      .subscribe((response) => {
        this.solicitudEstudents = response;
        this.solicitudEstudents.forEach((res) => {
          if (
            res.estadoCurso?.descripcion == 'aprobado' &&
            res.cursoId == this.course.id
          ) {
            totalAprobados = totalAprobados + 1;
          }
          if (
            res.estadoCurso?.descripcion == 'reprobado' &&
            res.cursoId == this.course.id
          ) {
            totalReprobados = totalReprobados + 1;
          }
          this.cursoEstudianteLista = {
            id: res.id,
            cursoId: res.cursoId,
            nota1: res.nota1,
            nota2: res.nota2,
            promedio: res.promedio,
            aprobado: totalAprobados,
            reprobado: totalReprobados,
          };
          this.listaMatriculados.push(this.cursoEstudianteLista);
        });
      });
  }

  public generateReports(): void {
    this.consulReport();
    this.matricula
      .findAllMatricula(this.cursoMatricula)
      .subscribe((response) => {
        this.solicitudEstudents = response;
        this.solicitudEstudents.forEach((res) => {
          if (res.cursoId == this.course.id) {
            //matricula
            this.cursoEstudiante = {
              id: res.id,
              cursoId: res.cursoId,
              nota1: res.nota1,
              nota2: res.nota2,
              promedio: res.promedio,
            };
            this.reporteListEntity = {
              matriculas: this.cursoEstudiante,
            };
            this.reportesList.push(this.reporteListEntity);
          }
        });

        this.reporteEntity = {
          fechaReporte: new Date(),
          reportes: this.reportesList,
        };


        if (this.validateReport) {
          console.log('el reporte existe');
        } else {
          this.reporteService.save(this.reporteEntity).subscribe((e) => {
           this.succesReport(e.status)
            console.log(e.status)
          });
          this.validateReport = true;

          console.log('el reporte no existe', this.validateReport);
        }
        setInterval('location.reload()', 10000);
        console.log(this.reporteEntity);
      });
  }
  //consulta todos los reportes y comprueba si existe un reporte x curso
  //si existe un reporte x curso, llama a la opcion de descargas
  public consulReport() {
    this.reporteService.findAll().subscribe((res) => {
      this.validateReportList = res;
      this.validateReportList.forEach((response) => {
        response.reportes.forEach((add) => {
          if (add.matriculas.cursoId == this.course.id) {
            //si entra el reporte x curso existe
            this.validateReport = true;
            this.validateReportEntity = {
              id: response.id,
              reportes: [],
            };
          }
          console.log(
            this.validateReport,
            'se actualizo el id a',
            this.validateReportEntity.id
          );
        });
      });
    });
  }

  generateReport() {
    this.dialogReport = true;
  }

  public downloadXls(id: any) {
    //aqui va el nombre del curso y la fecha en la que se descargo
    let name = 'Anexo A7 ' + this.course.name;

    this.reporteService.descarga(id).subscribe((data) => {
      let dowloadURL = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href = dowloadURL;
      link.download = name + '.xls';
      link.click();
    });
  }

  succesReport(code: number) {
    if(code=200){
      Swal.fire(
        'Hecho',
        'Se genero el reporte',
        'success'
      )
      this.dialogReport=false
    }else{
      Swal.fire(
        'Error',
        'No se pudo generar el reporte',
        'error'
      )
      this.dialogReport=false
    }
  }
}
