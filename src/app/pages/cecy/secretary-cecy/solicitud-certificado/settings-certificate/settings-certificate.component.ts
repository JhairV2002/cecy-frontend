import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { CertificateRequestService } from '../certificate-request.service';
import { Firmas } from '../firma';
import { formatDate } from '@angular/common';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-settings-certificate',
  templateUrl: './settings-certificate.component.html',
  providers: [MessageService]

})
export class SettingsCertificateComponent implements OnInit  {

  constructor(
    private messageService: MessageService,
    private certificateService: CertificateRequestService
  ){}
  selectedCountryAdvanced: any[] = [];
  filteredCountries: any[] = [];
  valCheck: string[] = [];
  cities: SelectItem[] = [];
  selectedDrop: SelectItem = { value: '' };
  filename: string = "";

  firma: Firmas = {
    nombres: "",
    apellidos: "",
    cedula: "",
    firma:""
  };
  formData = new FormData();

  rector: number = 0;
  patrocinador: number = 0;
  coordinador: number = 0;
  type: any[] = [];
  roles: any[] = [];
  typeCertificate: any = {
    tipo: "",
    firmas: this.roles
  }
  nameCertificate: any = {};

  ngOnInit(): void {
    this.type=[
      { label: 'Cecy', value: {name: 'Cecy'} },
      { label: 'Senecyt', value: {name: 'Senecyt' } },
    ]
  }

  sendSetings(event: any) {
    this.nameCertificate= this.selectedDrop
    if(this.rector != 0){
      this.firma = {id: this.rector}
    }
    if(this.patrocinador != 0){
      this.firma = {id: this.patrocinador}
    }
    if(this.coordinador != 0){
      this.firma = {id: this.coordinador}
    }
    this.typeCertificate = {
      tipo: this.nameCertificate.name,
    }
}

onUpload(event: any) {

  let formatoFecha = formatDate(new Date(), 'yyyy-MM-dd-hh-mm-ss', 'en_US')
 this.filename = this.firma.cedula + "-" + formatoFecha + ".png".trim()
 console.log(this.filename)
  const file = event.target.files[0];
  if(file){

    this.formData.append('file', file, this.filename);
  }
  //this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
}

subirFirma(){
this.firma = {
    nombres: this.firma.nombres,
    apellidos: this.firma.apellidos,
    cedula: this.firma.cedula,
    firma:this.filename
  }
  this.certificateService.uploadFile(this.formData).subscribe(()=>{this.formData = new FormData()})
  this.certificateService.subirfirma(this.firma).subscribe(()=>{this.firma = {
    nombres: "",
    apellidos: "",
    cedula: "",
    firma:""
  };})
}
}
