import { Component, OnInit } from '@angular/core';
import { SolicitudCertificado } from '../solicitud-certificado';
import { SolicitudCertificadoService } from '../solicitud-certificado.service';
import { PersonaService } from '../persona-service';
import { MatriculaServiceService } from '../matricula-service.service';
import { Matricula } from '../matricula';
import { ActivatedRoute } from '@angular/router';
import { VisualizationCoursesService } from '@services/cecy/secretary-cecy';
import { Curso } from '@models/cecy/secretary-cecy';
import { CertificadoPdfServiceService } from '../certificado-pdf-service.service';
import { Certificado } from '../certificado';
import { CodigosCertificadoService } from '../../codigos-certificado/codigos-certificado.service';
import { CodigoCertificado } from '../../codigos-certificado/codigos-certificado';



@Component({
  selector: 'app-solicitud-certificado-lista',
  templateUrl: './solicitud-certificado-lista.component.html',
})
export class SolicitudCertificadoListaComponent implements OnInit {

  constructor(
    private solicitudCertificadoService: SolicitudCertificadoService,
    private personaService: PersonaService,
    private cursoService: VisualizationCoursesService ,
    private matriculaService: MatriculaServiceService,
    private activatedRoute: ActivatedRoute,
    private certificadoPdf: CertificadoPdfServiceService,
    private codigoCertificadoService: CodigosCertificadoService,
  ) { }

  solicitudCertificadoList: SolicitudCertificado[] = [];
  matriculaList: Matricula[] = [];
  certificadoList: SolicitudCertificado[] = [];
  checkedList: SolicitudCertificado[] = [];
  parentSelector: boolean = false;
  codigoList: CodigoCertificado[] = [];
  certificadoEntity: Certificado = {
    id: 0,
    name: "",
    certicadoId: [],
    codigos: [],
  };
  codigoEntity: CodigoCertificado = {
    id: 0,
    codigo: "",
    estado: true,
  }
  ngOnInit(): void {
    this.findAll();
    this.activatedRoute.paramMap.subscribe(
    (params) => {
    if (params.get("id")) {
    this.findById(parseInt(params.get("id")!));
    }
    }
    )
  }


  public findAll(): void {
    this.solicitudCertificadoService.findAll().subscribe(
      (response) => {
        this.solicitudCertificadoList = response
        this.buscarPersona();
        this.buscarCurso();
        this.findMatricula();
      }
    )
  }
  public findMatricula(): void {
    this.matriculaService.findAll().subscribe(
      (response) => {
        this.matriculaList = response
        this.buscarMatricula();
      }
    )
  }
  public buscarPersona(): void {
    this.solicitudCertificadoList.forEach(
      (solicitud) => {
        this.personaService.findById(
          solicitud.userId
        ).subscribe(
          (persona) => {
            solicitud.nombrecompleto = persona.nombres + " " + persona.apellidos;
            solicitud.cedula = persona.cedula;
          }
        )
      }
    )
  }

  public buscarCurso(): void {
  this.solicitudCertificadoList.forEach(
  (solicitud) => {
  this.cursoService.findById(
  solicitud.courseId
  ).subscribe(
  (nombreCurso) => solicitud.curso = nombreCurso.nombre
  )
  }
  )
  }

  public buscarMatricula(): void {
    this.matriculaList.forEach(
    (matricula) => {
    if (matricula.state == 'Aprobado')
    this.solicitudCertificadoList.forEach(
    (certificado) => {
    if (certificado.userId == matricula.userId && certificado.courseId == this.currentEntity.id) {
    this.certificadoList.push(certificado)
    }
    }
    )
    }
    )
  }

  currentEntity: Curso =
  {
  id: 0,
  nombre: "",
  fechaInicio: new Date(),
  fechaFin: new Date(),
  };

  findById(id: number): void {
     this.cursoService.findById(id).subscribe(
       (response) => {
         this.currentEntity = response;
       }
     )
   }

   onChangeFood($event: { target: { value: any; checked: any; }; }) {
     const numeroId = $event.target.value;
     const isChecked = $event.target.checked;
     this.certificadoList = this.certificadoList.map((d) => {
       if (d.id == numeroId) {
         d.checkeado = isChecked;

         this.parentSelector = false;
         console.log(d)
         return d;
       }
       if (numeroId == -1) {
         d.checkeado = this.parentSelector;
         return d;
       }
       return d;
     });
   }

  generarCertificados(): void {
    this.certificadoList.forEach((a) => {
      this.consultarCodigos();
      this.codigoList.forEach((codigo) => {
        if (codigo.estado == true) {
          this.actualizarCodigo(codigo.id, codigo.codigo)
          //this.savePdf(a.cedula,codigo.id,a.courseId,a,codigo)
        }
      })
    })
  }
  public consultarCodigos(): void {
    this.codigoCertificadoService.findAll().subscribe(
      (cod) => {
        this.codigoList = cod;
      })
  }
  public actualizarCodigo(codigoId: number, codigoNombre: string): void {
    this.codigoCertificadoService.update(this.codigoEntity).subscribe(() => {
      this.codigoEntity = {
        id: codigoId,
        codigo: codigoNombre,
        estado: false,
      }
    })
  }
  public probarUno(): void {
    const a = "";
    const b = 0;
    const c = 0;
    const d = {
      id: 1, userId: 1,
      courseId: 1,
      tuitionId: 1,
      estado: "generado",
      fecha: new Date,
      nombrecompleto: "",
      cedula: "",
      curso: "",
    };
    const e = {
      id: 1,
      codigo: "",
    };
    this.savePdf(a, b, c, d, e)
  }
  public savePdf(a: string, b: number, c: number, d: SolicitudCertificado, e: CodigoCertificado): void {
    this.certificadoPdf.save(this.certificadoEntity).subscribe(() => {
      this.certificadoEntity =
        {
            id: 0,
            name: "Prueba",
            certicadoId:
              {
                id: 3, userId: 1, courseId: 4, tuitionId: 1, estado: 'Generado'
              },
            codigos:
              { id: 2, codigo: 'cod0002', estado: true }
            }

      console.log(this.certificadoEntity)
    })
  }
  public findByIdCertificado(): void {
    this.certificadoPdf.findById(4).subscribe((response) => {
      this.certificadoEntity = response
      console.log(this.certificadoEntity)
    })
  }

   public descarga(id: any){this.certificadoPdf.descarga(id).subscribe((data) =>{
    let dowloadURL = window.URL.createObjectURL(data)
    let link = document.createElement('a')
    link.href = dowloadURL
    link.download = "certificado.pdf"
    link.click()
  })}
}
