import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


//Importaciones nuevas
import { Report } from '../certificate';
import { Certificate } from '../certificate';
import { Codes } from '../certificate';
import { Estudiantes } from '../certificate';
import { Matricula } from '../certificate';
import { CertificateRequestService } from '../certificate-request.service';



@Component({
  selector: 'app-solicitud-certificado-lista',
  templateUrl: './solicitud-certificado-lista.component.html',
})
export class SolicitudCertificadoListaComponent implements OnInit {
  constructor(
    private solicitudCertificadoService: CertificateRequestService,
    private activatedRoute: ActivatedRoute,


  ) { }




  //no se si sirva lo de arriva
  //Lista de reporte
  reportEntity: Report={
    id:0,
    fechaReporte:new Date,
    reportes:[]

  }
  //iniciamos el certificado
  certificadoEntity: Certificate = {
    id:0,
    estado: false,
    fecha: new Date()
  };
  estudentEntity: Estudiantes={
    id: 0,
    cedula: "",
    fechaNacimiento: "",
    nombres: "",
    apellidos: "",
    email:""
  }
  matriculaEntity:Matricula={
    id:0,
    estudiantes: this.estudentEntity
  }
  codeEntity: Codes={
    id:0,
    codigo:"",
    matriculas:this.matriculaEntity,
    certificado:this.certificadoEntity
  }
  //cambia el estado para la validacion de certificado
  generate: boolean=false;


  ngOnInit(): void {
    //this.findAll();
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.findById(parseInt(params.get('id')!));
      }
    });
  }

  //Trae a la entdad de reporte con la lista de codigos-----
  findById(id: number): void {
    this.solicitudCertificadoService.findById(id).subscribe((response) => {
      this.reportEntity = response;

    });
  };

  //Actualizar el codigo--------
  updateEntity(id:number):void {
    console.log(id,"este es el id")
  };



  //vamos a ver si genera de la nueva forma-----
  //genera sertificados
  public generateCertificates():void {


    this.reportEntity.reportes.forEach(
      (res)=>{
        if(res.certificado==null){
          this.certificadoEntity={

            estado:true,
            fecha: new Date()
          };
          console.log("se a creado un nuevo certificado");

        }
        if(res.certificado!=null){
          // this.certificadoEntity={
          //   id:res.certificado.id,
          //   estado:res.certificado.estado,
          //   fecha: res.certificado.fecha
          // };

          console.log("existe un certificado")
          return ;

        }


        this.estudentEntity={
          id: res.matriculas.estudiantes.id,
          cedula: res.matriculas.estudiantes.cedula,
          fechaNacimiento: res.matriculas.estudiantes.fechaNacimiento,
          nombres: res.matriculas.estudiantes.nombres,
          apellidos: res.matriculas.estudiantes.apellidos,
          email:res.matriculas.estudiantes.email
        };

        this.matriculaEntity={
            id:res.matriculas.id,
            estudiantes:this.estudentEntity

        };

        this.codeEntity={
          id:res.id,
          codigo:res.codigo,
          matriculas:this.matriculaEntity,
          certificado: this.certificadoEntity

        };

        //console.log(JSON.stringify(this.codeEntity))
        if(this.generate){
          console.log('validacion de generacion de ceertificado true')
          return
        }
        this.solicitudCertificadoService.saveCertificate(this.codeEntity,res.id).subscribe();

      }

    )
    this.generate=true;
    console.log('primera ves generado',this.generate)
  }



}
