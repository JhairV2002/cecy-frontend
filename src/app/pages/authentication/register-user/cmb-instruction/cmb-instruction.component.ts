import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Catalogue } from '@models/cecy';
import { CatalogueService } from '@services/cecy';

@Component({
  selector: 'app-cmb-instruction',
  templateUrl: './cmb-instruction.component.html',
  styleUrls: ['./cmb-instruction.component.css'],
})
export class CmbInstructionComponent {
  constructor(private CatalogueService: CatalogueService) { }

  lvlsInstruccion: Catalogue[] = [];
  @Output() idEmitter = new EventEmitter<number>();
  @Input() id: number | undefined = 0;

  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.CatalogueService.findAll().subscribe((response) =>
      response.forEach((t) => {
        if (t.nombre == 'nivel_instruccion') {
          this.lvlsInstruccion.push(t);
        }
      })
    );
  }

  public onSelect(id: string) {
    console.log('la instruccion es:' + id);
    this.idEmitter.emit(parseInt(id));
  }
}
