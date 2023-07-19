import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import { Codes, UpdateCode } from '../certificate';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CertificateRequestService } from '../certificate-request.service';

@Component({
  selector: 'app-codigo-certificate',
  templateUrl: './codigo-certificate.component.html'
})
export class CodigoCertificateComponent implements OnInit {


  constructor(
    public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private codeService: CertificateRequestService) {
  }
  ExcelData: any[] = [];
  filterExcel: any[] = [];
  updatecode: UpdateCode = {};
  Listcodes: Codes[] = [];

  ngOnInit(): void {

    this.Listcodes = this.config.data.Listcodes;
    console.log(this.Listcodes);
  }

  ReadExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    console.log(this.Listcodes);
    fileReader.onload = (e) => {

      var reporte = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetName = reporte.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(reporte.Sheets[sheetName[0]])
      //console.log(JSON.stringify(this.ExcelData));
      //Elimina las posiciones extra
      this.ExcelData.splice(0, 10);
      this.filterExcel = this.ExcelData;

      //console.log(JSON.stringify(this.filterExcel))

    }

  }


  //Actuliza los codigos
  updateCodes() {
    this.filterExcel.forEach(
      (res) => {
        //Consultar la cedula de cada posicion __EMPTY_8
        //se debe comparar la cedula con la entidad de codigo
        //para esto se necesita recuperar la lista filtrada anteriormente de codigos
        this.Listcodes.forEach((cod) => {
          if (cod.matriculas.estudiantes.cedula == res.__EMPTY_8) {
            this.codeService.updateCode(this.updatecode = { codigo: res.__EMPTY_23 }, cod.id).subscribe();
            console.log("Se esta Actualizando el codigo", cod.id, res.__EMPTY_23)
          }
        }
        );

      }

    )
    this.updatecode = {}
    this.closeModel()
  }

  closeModel(){
    this.ref.close()
  }
}
