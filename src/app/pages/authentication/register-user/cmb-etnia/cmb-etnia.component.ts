import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Catalogue } from '@models/cecy';
import { CatalogueService } from '@services/cecy';

@Component({
  selector: 'app-cmb-etnia',
  templateUrl: './cmb-etnia.component.html',
  styleUrls: ['./cmb-etnia.component.css'],
})
export class CmbEtniaComponent {
  constructor(private CatalogueService: CatalogueService) { }

  etnias: Catalogue[] = [];
  @Output() idEmitter = new EventEmitter<number>();
  @Input() id: number | undefined = 0;

  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.CatalogueService.findAll().subscribe((response) =>
      response.forEach((t) => {
        if (t.nombre == 'etnia') {
          this.etnias.push(t);
        }
      })
    );
  }

  public onSelect(id: string) {
    console.log('la etnia es:' + id);
    this.idEmitter.emit(parseInt(id));
  }
}
