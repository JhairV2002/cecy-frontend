import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { CertificateRequestService } from '../certificate-request.service';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-settings-certificate',
  templateUrl: './settings-certificate.component.html',
  providers: [MessageService]

})
export class SettingsCertificateComponent {

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

  filterCountry(event: any) {
    // const filtered: any[] = [];
    // const query = event.query;
    // for (let i = 0; i < this.countries.length; i++) {
    //     const country = this.countries[i];
    //     if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //         filtered.push(country);
    //     }
    // }

    // this.filteredCountries = filtered;
}

onUpload(event: any) {
 this.filename = "imagen.png"
  const file = event.target.files[0];
  if(file){
    const formData = new FormData();
    formData.append('file', file, this.filename);

    this.certificateService.uploadFile(formData).subscribe(response =>{
      console.log(response)
    })
  }
  //this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
}
}
