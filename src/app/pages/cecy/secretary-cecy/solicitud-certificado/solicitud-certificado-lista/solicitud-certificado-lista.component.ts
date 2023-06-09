import { Component, OnInit } from '@angular/core';
import { Matricula, SolicitudCertificado } from '../solicitud-certificado';
import { SolicitudCertificadoService } from '../solicitud-certificado.service';
import { PersonaService } from '../persona-service';
import { MatriculaServiceService } from '../matricula-service.service';
// import { Matricula } from '../matricula';
import { ActivatedRoute } from '@angular/router';
import { VisualizationCoursesService } from '@services/cecy/secretary-cecy';
import { Course } from '@models/cecy/secretary-cecy';
import { CertificadoPdfServiceService } from '../certificado-pdf-service.service';
import { Certificado } from '../certificado';
import { CodigosCertificadoService } from '../../codigos-certificado/codigos-certificado.service';
import { CodigoCertificado } from '../../codigos-certificado/codigos-certificado';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';
import { CursoService } from '../../../responsible-execute/curso/curso.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-solicitud-certificado-lista',
  templateUrl: './solicitud-certificado-lista.component.html',
})
export class SolicitudCertificadoListaComponent implements OnInit {
  constructor(
    private solicitudCertificadoService: SolicitudCertificadoService,
    private personaService: PersonaService,
    private cursoService: VisualizationCoursesService,
    private matriculaService: MatriculaServiceService,
    private activatedRoute: ActivatedRoute,
    private certificadoPdf: CertificadoPdfServiceService,
    private codigoCertificadoService: CodigosCertificadoService
  ) { }

  solicitudCertificadoList: Matricula[] = [];
  matriculaList: Matricula[] = [];
  certificadoList: Matricula[] = [];
  checkedList: SolicitudCertificado[] = [];
  parentSelector: boolean = false;
  codigoList: CodigoCertificado[] = [];
  certificateFilter: Certificado[]=[];
  certificadoEntity: Certificado = {
    id:0,
    userId:0,
    courseId:0,
    tuitionId:0,
    estado:'',
    fecha: new Date()
  };
  codigoEntity: CodigoCertificado = {
    id: 0,
    codigo: '',
    estado: true,
  };
  courses: Course ={
    id: 0,
  name: '',
  image: '',
  planificationId:0,
  }
  ngOnInit(): void {
    this.findAll();
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.findById(parseInt(params.get('id')!));
      }
    });
  }
  findById(id: number): void {
    this.cursoService.findById(id).subscribe((response) => {
      this.courses = response;
    });
  }
  public findAll(): void {
    this.solicitudCertificadoService.findAll().subscribe((response) => {
      this.solicitudCertificadoList = response;

      // this.buscarPersona();
      //this.buscarCurso();
      //this.findMatricula();
      this.conteo();
    });
  }
  /*public findMatricula(): void {
    this.matriculaService.findAll().subscribe(
      (response) => {
        this.matriculaList = response
        this.buscarMatricula();
      }
    )
  }*/
  // public buscarPersona(): void {
  //   this.solicitudCertificadoList.forEach((solicitud) => {
  //     solicitud.cedula;
  //     this.personaService
  //       .findById(solicitud.estudianteId.personaId)
  //       .subscribe((persona) => {
  //         solicitud.nombrecompleto = persona.nombres + ' ' + persona.apellidos;
  //         solicitud.cedula = persona.dni;
  //       });
  //   });
  // }

  // public buscarCurso(): void {
  //   this.solicitudCertificadoList.forEach((solicitud) => {
  //     this.cursoService
  //       .findById(solicitud.cursoId)
  //       .subscribe((nombreCurso) => (solicitud.curso = nombreCurso.name));
  //   });
  // }

  /*public buscarMatricula(): void {
    this.matriculaList.forEach(
    (matricula) => {
    if (matricula.state == 'Aprobado')
    this.solicitudCertificadoList.forEach(
    (certificado) => {
    if (certificado.estudianteId == matricula.userId && certificado.cursoId == this.currentEntity.id) {
    this.certificadoList.push(certificado)
    }
    }
    )
    }
    )
  }*/

  public conteo(): void {
    this.solicitudCertificadoList.forEach(
      (certificado) => {
        if (certificado.cursoId == this.courses.id) {
        this.certificadoList.push(certificado)
        }
        }
    )
  }



  /*onChangeFood($event: { target: { value: any; checked: any } }) {
    const numeroId = $event.target.value;
    const isChecked = $event.target.checked;
    this.certificadoList = this.certificadoList.map((d) => {
      if (d.id == numeroId) {
        d.checkeado = isChecked;

        this.parentSelector = false;
        console.log(d);
        return d;
      }
      if (numeroId == -1) {
        d.checkeado = this.parentSelector;
        return d;
      }
      return d;
    });
  }*/

  generarCertificados(): void {
    this.certificadoList.forEach((a) => {
      this.consultarCodigos();
      this.codigoList.forEach((codigo) => {
        if (codigo.estado == true) {
          this.actualizarCodigo(codigo.id, codigo.codigo);
          //this.savePdf(a.cedula,codigo.id,a.courseId,a,codigo)
        }
      });
    });
  }
  public consultarCodigos(): void {
    this.codigoCertificadoService.findAll().subscribe((cod) => {
      this.codigoList = cod;
    });
  }
  public actualizarCodigo(codigoId: number, codigoNombre: string): void {
    this.codigoCertificadoService.update(this.codigoEntity).subscribe(() => {
      this.codigoEntity = {
        id: codigoId,
        codigo: codigoNombre,
        estado: false,
      };
    });
  }

  public findByIdCertificado(): void {
    this.certificadoPdf.findById(4).subscribe((response) => {
      this.certificadoEntity = response;
      console.log(this.certificadoEntity);
    });
  }




  public descarga(id: any) {
    this.certificadoPdf.descarga(id).subscribe((data) => {
      let dowloadURL = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href = dowloadURL;
      link.download = 'certificado.pdf';
      link.click();
    });
  }



  public generateCertificates():void {

    this.certificadoList.forEach(
      (res)=>{
        this.certificadoEntity={

          userId:res.estudiantes.id,
          courseId:res.cursoId,
          tuitionId:res.id,
          estado:'generado',
          fecha: new Date()
        }
        this.certificadoPdf.save(this.certificadoEntity).subscribe();
      }

    )
  }
  //falta completar
  public validateCertificates(user:any, course:any): void{
    this.certificadoPdf.findAll().subscribe(
      (data)=>{
        this.certificateFilter=data
        this.certificateFilter.forEach(
          (res)=>{
            if(user == res.userId&& course==res.courseId){
              console.log("se repiten ")
            }else{
              return;

            }
          }
        )
      }
    )

  }

}
