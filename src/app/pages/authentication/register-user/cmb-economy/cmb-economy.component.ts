import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Catalogue } from '@models/cecy';
import { CatalogueService } from '@services/cecy';

@Component({
  selector: 'app-cmb-economy',
  templateUrl: './cmb-economy.component.html',
  styleUrls: ['./cmb-economy.component.css'],
})
export class CmbEconomyComponent implements OnInit {
  constructor(private CatalogueService: CatalogueService) { }

  listEconomies: Catalogue[] = [];
  @Output() idEmitter = new EventEmitter<number>();
  @Input() id: number | undefined = 0;

  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.CatalogueService.findAll().subscribe((response) =>
      response.forEach((t) => {
        if (t.nombre == 'situacion_economica') {
          this.listEconomies.push(t);
        }
      })
    );
  }

  public onSelect(id: string) {
    console.log('la economia es:' + id);
    this.idEmitter.emit(parseInt(id));
  }
}
