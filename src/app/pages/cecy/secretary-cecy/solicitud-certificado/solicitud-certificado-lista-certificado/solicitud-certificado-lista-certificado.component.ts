import { Component, OnInit } from '@angular/core';

import { VisualizationCoursesService } from '@services/cecy/secretary-cecy';
import { ActivatedRoute } from '@angular/router';

import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';

import { Report } from '../certificate';
import { CertificateRequestService } from '../certificate-request.service';




@Component({
  selector: 'app-solicitud-certificado-lista-certificado',
  templateUrl: './solicitud-certificado-lista-certificado.component.html',
})
export class SolicitudCertificadoListaCertificadoComponent implements OnInit{


 constructor(
  private certificadoService: CertificateRequestService,
  private activatedRoute: ActivatedRoute,
  //-----
  private solicitudCertificadoService: CertificateRequestService,
  ){}

//news
reportEntity: Report={
  id:0,
  fechaReporte:new Date,
  reportes:[]

}

 ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((params) => {
    if (params.get('id')) {
      this.findById(parseInt(params.get('id')!));
    }
  });
  //this.findAll()
 }

 //trae a todos los reportes
 findById(id: number): void {
  this.solicitudCertificadoService.findById(id).subscribe((response) => {
    this.reportEntity = response;
  });
}
  public downloadCertificate(id: any) {
    this.certificadoService.downloadCertificate(id).subscribe((data) => {
      let dowloadURL = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href = dowloadURL;
      link.download = 'certificado.pdf';
      link.click();
    });
  }
}
