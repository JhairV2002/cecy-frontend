import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { CertificateRequestService } from '../certificate-request.service';
import { Firmas } from '../firma';
import { TipoCertificado, tipo } from '../certificate';

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
    private messageService: MessageService,
    private certificateService: CertificateRequestService
  ) {}
  selectedCountryAdvanced: any[] = [];
  filteredCountries: any[] = [];
  valCheck: string[] = [];
  cities: SelectItem[] = [];
  selectedDrop: SelectItem = { value: '' };

  firm: Firmas = { id: 0 };
  rector: number = 0;
  patrocinador: number = 0;
  coordinador: number = 0;
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

  ngOnInit(): void {
    this.type = [
      { label: 'Cecy', value: { name: 'Cecy' } },
      { label: 'Senecyt', value: { name: 'Senecyt' } },
    ];
  }

  sendSetings() {
    this.nameCertificate = this.selectedDrop;
    if (this.rector != 0) {
      this.firm = { id: this.rector };
      this.roles.push((this.rol = { rol: 'Rector', firma: this.firm }));
    }
    if (this.patrocinador != 0) {
      this.firm = { id: this.patrocinador };
      this.roles.push((this.rol = { rol: 'Patrocinador', firma: this.firm }));
    }
    if (this.coordinador != 0) {
      this.firm = { id: this.coordinador };
      this.roles.push(
        (this.rol = { rol: 'Coordinador Cecy', firma: this.firm })
      );
    }

    this.typeCertificate = {
      tipo: this.nameCertificate.name,
      firmas: this.roles,
    };

    this.certificateService
      .postTypeCertificate(this.typeCertificate)
      .subscribe((tip) => {
        this.certificateService.tipoCertificado = {
          id: tip.id,
        };
        console.log('prueba para tipo certifivado' + JSON.stringify(tip.id));
      });
    console.log(JSON.stringify(this.roles));
  }
}
