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
  alert: string = '';

  ngOnInit(): void {
    this.type = [
      { label: 'Cecy', value: { name: 'Cecy' } },
      { label: 'Senecyt', value: { name: 'Senecyt' } },
    ];
  }

  public sendSetings() {
    this.nameCertificate = this.selectedDrop;
    this.submittedSettings = true;
    if (this.nameCertificate.name == null && this.submittedSettings) {
      console.log('entre');
      this.alert = 'Seleccione un tipo de certificado';
      this.messageService.add({
        severity: 'warn',
        summary: `No encontrado`,
        detail: `Seleccione un tipo de certificado`,
      });
      return;
    }
    if (
      this.nameCertificate.name == 'Senecyt' &&
      this.valCheckCoordinadorCecy &&
      this.valCheckCoordinadorVinculacion &&
      this.valCheckPatrocinador &&
      this.valCheckRector
    ) {
      this.alert = 'El numero maximo de firmantes es 3';
      this.messageService.add({
        severity: 'error',
        summary: `Firmantes permitidos`,
        detail: `El numero maximo de firmantes es 3`,
      });
      return;
    }
    console.log('response:', this.nameCertificate.name);
    //cecy solo 2
    if (
      this.nameCertificate.name == 'Cecy' &&
      this.valCheckCoordinadorCecy &&
      this.valCheckCoordinadorVinculacion &&
      this.valCheckPatrocinador &&
      this.valCheckRector
    ) {
      this.alert = 'El numero maximo de firmantes es 2';
      this.messageService.add({
        severity: 'error',
        summary: `Firmantes permitidos`,
        detail: `El numero maximo de firmantes es 2`,
      });
      return;
    }

    if (this.rector != 0 && this.valCheckRector) {
      this.firm = { id: this.rector };
      this.roles.push(
        (this.rol = { rol: 'Rector IST YAVIRAC', firma: this.firm })
      );
    }
    if (this.patrocinador != 0 && this.valCheckPatrocinador) {
      this.firm = { id: this.patrocinador };
      this.roles.push((this.rol = { rol: 'Patrocinador', firma: this.firm }));
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
      .subscribe((tip) => {
        this.certificateService.tipoCertificado = {
          id: tip.id,
        };
        console.log('prueba para tipo certifivado' + JSON.stringify(tip.id));
      });
    console.log(JSON.stringify(this.roles));
  }

  participantOne(event: any) {
    console.log(event);
  }
}
