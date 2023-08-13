import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


//Importaciones nuevas
import { Report, UpdateCode, Codes } from '../certificate';
import { Certificate } from '../certificate';
import { Estudiantes } from '../certificate';
import { Matricula } from '../certificate';
import { CertificateRequestService } from '../certificate-request.service';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CodigoCertificateComponent } from '../codigo-certificate/codigo-certificate.component';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';



@Component({
  selector: 'app-solicitud-certificado-lista',
  templateUrl: './solicitud-certificado-lista.component.html',
  providers: [DialogService]
})
export class SolicitudCertificadoListaComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  constructor(
    private solicitudCertificadoService: CertificateRequestService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private dialogService: DialogService

  ) { }

  //Lista de reporte
  reportEntity: Report={
    id:0,
    fechaReporte:new Date,
    reportes:[],
    stateCertificate: false


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
    cursoId: 0,
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



  //intento sakai
  updateCode: UpdateCode={}
  updateCodeDialog: boolean = false;

    deleteProductDialog: boolean = false;


    codigos: Codes[] = [];

    codigo: any = {};


    //----
    submitted: boolean = false;
    //----
    cols: any[] = [];


    rowsPerPageOptions = [5, 10, 20];
    erroGenerate = [];
    dialogCertificate: boolean = false;
    stateCertificateReport: any = {
      stateCertificate: false
    }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
        if (params.get('id')) {
          this.findById(parseInt(params.get('id')!));
        }
      });


        this.cols = [
            { field: 'cedula', header: 'DNI' },
            { field: 'nombres', header: 'Nombres' },
            { field: 'apellidos', header: 'Apellidos' },
            { field: 'codigo', header: 'Codigo' }
        ];




  }

  openNew() {
    this.codigo = {};
    this.submitted = false;
    this.updateCodeDialog = true;
}

show() {
  this.ref = this.dialogService.open(CodigoCertificateComponent, { header: 'Lista de Codigos',
  data:{Listcodes: this.codigos}});
  this.ref.onClose.subscribe();
}
ngOnDestroy() {
  if (this.ref) {
      this.ref.close();
  }
}

editProduct(codigo: any) {
    this.codigo = { ...codigo };
    this.updateCodeDialog = true;
}

hideDialog() {
    this.updateCodeDialog = false;
    this.submitted = false;
}

saveProduct() {
    this.submitted = true;
    if (this.codigo.codigo?.trim()) {
      if (this.codigo.id){
        this.solicitudCertificadoService.updateCode(
          this.updateCode={
            codigo: this.codigo.codigo
          },
          this.codigo.id
          ).subscribe()
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Codigo Actualizado', life: 3000 });
      }
      this.updateCodeDialog = false;
      this.codigo = {};
    }


}

onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}



  // //Trae a la entdad de reporte con la lista de codigos-----
  findById(id: number): void {
    this.solicitudCertificadoService.findById(id).subscribe((response) => {
      this.reportEntity = response;
      this.codigos = response.reportes

      if(this.reportEntity.stateCertificate){
        this.generate= true;
        console.log("response"+this.reportEntity.stateCertificate);

      };

    });
  };

  downloadCertificate(id: number){
    this.solicitudCertificadoService.downloadCertificate(id)
    .subscribe((data) =>{
      let dowloadURL = window.URL.createObjectURL(data)
      let link = document.createElement('a')
      link.href = dowloadURL
      link.download = "certificado.pdf"
      link.click()
    })


  }

  // //genera sertificados
   public generateCertificates():void {
    var countStateSucces=0;
    var countStateError=0;
    var total = 0;
    console.log(JSON.stringify( this.solicitudCertificadoService.tipoCertificado))

     this.reportEntity.reportes.forEach(
       (res)=>{
         if(res.certificado==null){
           this.certificadoEntity={

             estado:true,
             fecha: new Date(),
             tipoCertificado: this.solicitudCertificadoService.tipoCertificado
           };
           console.log("se a creado un nuevo certificado");

         }
         if(res.certificado!=null){
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
             cursoId: res.matriculas.cursoId,
             estudiantes:this.estudentEntity

         };

         this.codeEntity={
           id:res.id,
           codigo:res.codigo,
           matriculas:this.matriculaEntity,
           certificado: this.certificadoEntity

         };


         if(this.generate){
           console.log('validacion de generacion de ceertificado true')
           return
         }
         this.solicitudCertificadoService.saveCertificate(this.codeEntity,res.id).pipe(finalize(()=>{
          if(this.reportEntity.reportes.length == total){
            this.succesCertificate(
              countStateSucces,
              countStateError
             )
           }
         })).subscribe((e)=>{
          total ++;
          if(e.status == 200){
            countStateSucces ++;
          }else{
            countStateError ++;
          }
          console.log(e.status);
        });
        this.solicitudCertificadoService.patchReport(this.stateCertificateReport = {
          stateCertificate: true
        },this.reportEntity.id).subscribe();
        this.generate=true;
        console.log(this.reportEntity.id)
         console.log(JSON.stringify(this.codeEntity))
       }
     )

     console.log(countStateSucces+"Aaaaaaaaaaaaaaa")
     console.log(countStateError+"Errorrrrrrrrr")
     this.generate=true;
     console.log('primera ves generado',this.generate)
  }
  generateCertificate(){
    this.dialogCertificate=true
  }

  succesCertificate(succes: number,error: number) {
    if(error>0){
      Swal.fire(
        'Certificado con problema',
        'No se han podido generar: ' + error + ' Certificados con falla',
        'info'
      )
      this.dialogCertificate=false
    }else{
      Swal.fire(
        'Ya puede visualizar los certificados',
        'Se ha generado corecctamente:'+ succes + ' Certificados',
        'success'
      )
      this.dialogCertificate=false
    }
  }

}
