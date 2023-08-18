import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { CertificateRequestService } from '../certificate-request.service';
import { Firmas } from '../firma';
import { TipoCertificado, tipo, Sponsor, Course,Report, Codes } from '../certificate';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-settings-certificate',
  templateUrl: './settings-certificate.component.html',
  providers: [MessageService],
})
export class SettingsCertificateComponent implements OnInit {
  constructor(
    private certificateService: CertificateRequestService,
    private activatedRoute: ActivatedRoute,
  ) {}
  selectedCountryAdvanced: any[] = [];
  filteredCountries: any[] = [];
  valCheckCoordinadorCecy: boolean = false;
  valCheckRector: boolean = false;
  valCheckPatrocinador: boolean = false;
  valCheckCoordinadorVinculacion: boolean = false;
  submittedSettings: boolean = false;
  cities: SelectItem[] = [];
  selectedDrop: SelectItem = { value: '' };

  firm: Firmas = { id: 0 };
  rector: number = 0;
  patrocinador: number = 0;
  coordinador: number = 0;
  coordinadorVinculacion: number = 0;
  type: any[] = [];
  roles: tipo[] = [];
  typeCertificate: TipoCertificado = {
    tipo: '',
    firmas: this.roles,
  };
  nameCertificate: any = {};
  rol: tipo = {
    rol: '',
    firma: this.firm,
  };
  alert: string="";
  totalOptions: any[]=[]
  typeCertificateid: any = {
    id: 0,
    tipo: '',
    firmas: this.roles,
  };

  sponsor: Sponsor[]=[]

  courseSponsor:Course={
    id: 0,
    sponsorId: 0,
  }

  reportEntity: Report={
    id:0,
    fechaReporte:new Date,
    reportes:[],
    stateCertificate: false
  }

  codigos: Codes[] = [];

  sponsorName: string = "";

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.findAllSponsor(parseInt(params.get('id')!));
      }
    });
    this.type = [
      { label: 'Cecy', value: { name: 'Cecy' } },
      { label: 'Senecyt', value: { name: 'Senecyt' } },
    ];
  }

  public findAllSponsor(id: number){
    var spon = 0;
    var sponsorId=0;
    this.certificateService.findById(id).pipe(finalize(()=>{
      this.certificateService.findByIdCourse(spon).pipe(finalize(()=>{
        this.certificateService.getSponsors().subscribe((a)=>{
          this.sponsor = a;
          this.sponsor.forEach((f)=>{
            if(sponsorId==f.id){
              this.sponsorName = f.name;
              console.log("nombre sponsor"+f.name);
            }
          })
        })
      })).subscribe((spo)=>{
        this.courseSponsor=spo;
        sponsorId = this.courseSponsor.sponsorId
        console.log("sponsor ssssssss"+this.courseSponsor.sponsorId);
      })
     })).subscribe((d)=>{
      this.reportEntity=d;
      this.codigos=this.reportEntity.reportes
      spon=this.codigos[0].matriculas.cursoId

    })
  }
  public sendSetings() {
    this.alert=""
    this.nameCertificate = this.selectedDrop;
    this.submittedSettings=true;
    var numberCheck = 0;
    //valida que el nombre del certificado exista
    if(this.nameCertificate.name == null && this.submittedSettings){
      console.log('entre')
      this.alert = "Seleccione un tipo de certificado";
      return;
    }
    this.totalOptions.push(this.valCheckCoordinadorCecy);
    this.totalOptions.push(this.valCheckCoordinadorVinculacion);
    this.totalOptions.push(this.valCheckPatrocinador);
    this.totalOptions.push(this.valCheckRector);


    if( this.nameCertificate.name == "Senecyt"){

      this.totalOptions.forEach((r)=>{

            console.log("response val:",r)
            if(r){
              numberCheck++;

            };

          });
          this.totalOptions=[];
          console.log("response number:",numberCheck);
          switch (numberCheck) {
            case 0:
              this.alert="No se seleccioni ningun firmantes";

                return;
            case 1:
              this.alert="Selecciono 1 firmante pero el numero minimo es 2 y el maximo 3";
              return;
            case 4:
              this.alert="Selecciono 4 firmantes pero el numero minimo es 2 y el maximo 3";
              return;
            default:
              console.log("entre en el default")
              break;
        }


      }
    console.log("response:" ,this.nameCertificate.name)
    //cecy solo 2


    if( this.nameCertificate.name== "Cecy"){
          this.totalOptions.forEach((r)=>{

            console.log("response val:",r)
            if(r){
              numberCheck++;

            };

          });
          this.totalOptions=[];
          console.log("response number:",numberCheck);
          switch (numberCheck) {
            case 0:
              this.alert="No existen firmantes";

                return;
            case 1:
              this.alert="Selecciono 1 firmante pero el numero minimo es 2";
              return;
            case 3:
              this.alert="Selecciono 3 firmantes pero el numero minimo es 2";
              return;
            case 4:
              this.alert="Selecciono 4 firmantes pero el numero minimo es 2";
              return;
            default:
              console.log("entre en el default")
              break;
        }

      };


      console.log("pass:")
    if (this.rector != 0 && this.valCheckRector) {
      this.firm = { id: this.rector };
      this.roles.push(
        (this.rol = { rol: 'Rector IST YAVIRAC', firma: this.firm })
      );
    }
    if (this.patrocinador != 0 && this.valCheckPatrocinador) {
      this.firm = { id: this.patrocinador };
      this.roles.push((this.rol = { rol: this.sponsorName, firma: this.firm }));
    }
    if (this.coordinador != 0 && this.valCheckCoordinadorCecy) {
      this.firm = { id: this.coordinador };
      this.roles.push(
        (this.rol = { rol: 'Coordinador Cecy', firma: this.firm })
      );
    }
    if (
      this.coordinadorVinculacion != 0 &&
      this.valCheckCoordinadorVinculacion
    ) {
      this.firm = { id: this.coordinadorVinculacion };
      this.roles.push(
        (this.rol = { rol: 'Coordinador de Vinculacion', firma: this.firm })
      );
    }
    console.log('sadaddsad');
    this.typeCertificate = {
      tipo: this.nameCertificate.name,
      firmas: this.roles,
    };

    this.certificateService
     .postTypeCertificate(this.typeCertificate)
      .subscribe( response => {
        // Obtienes el estado HTTP
        console.log(response.status)
        this.succesSettings(response.status)
        // Obtienes el body de la respuesta
        this.typeCertificateid = response.body;
        console.log(this.typeCertificateid.id)

        this.certificateService.tipoCertificado = {
          id: this.typeCertificateid.id,
        }
        console.log('prueba para tipo certifivado' + JSON.stringify(this.typeCertificateid.id));
    });
    console.log(JSON.stringify(this.roles));

  }

  participantOne(event: any) {
    console.log(event);
  }

  succesSettings(code: number) {
    if(code=200){
      Swal.fire(
        'Hecho',
        'Se genero el tipo certificado',
        'success'
      )
    }else{
      Swal.fire(
        'Error',
        'No se pudo generar el tipo certificado',
        'error'
      )
    }
  }
}
