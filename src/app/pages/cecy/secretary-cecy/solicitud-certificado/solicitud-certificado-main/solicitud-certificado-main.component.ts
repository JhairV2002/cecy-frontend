import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitud-certificado-main',
  templateUrl: './solicitud-certificado-main.component.html',
})
export class SolicitudCertificadoMainComponent implements OnInit {

  ngOnInit(): void {

  }

  activeTab:string = 'Estudiantes';

  onTabClick(tab :any){
    this.activeTab = tab;
  }


}
