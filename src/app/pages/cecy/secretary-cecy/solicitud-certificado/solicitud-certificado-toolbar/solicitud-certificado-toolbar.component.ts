import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-solicitud-certificado-toolbar',
  templateUrl: './solicitud-certificado-toolbar.component.html',
})
export class SolicitudCertificadoToolbarComponent implements OnInit {

  @Input() entityName: string = "";
  @Output() termEmitter = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  public onInput(term: string){
    this.termEmitter.emit(term);
  }
}
