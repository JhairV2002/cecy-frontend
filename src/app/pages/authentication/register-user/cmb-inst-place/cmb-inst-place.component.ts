import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Catalogue } from '@models/cecy';
import { CatalogueService } from '@services/cecy';

@Component({
  selector: 'app-cmb-inst-place',
  templateUrl: './cmb-inst-place.component.html',
  styleUrls: ['./cmb-inst-place.component.css'],
})
export class CmbInstPlaceComponent {
  constructor(private CatalogueService: CatalogueService) { }

  roles: Catalogue[] = [];
  @Output() idEmitter = new EventEmitter<number>();
  @Input() id: number | undefined = 0;

  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.CatalogueService.findAll().subscribe((response) =>
      response.forEach((t) => {
        if (t.nombre == 'roles') {
          this.roles.push(t);
        }
      })
    );
  }

  public onSelect(id: string) {
    console.log('El rol es:' + id);
    this.idEmitter.emit(parseInt(id));
  }
}
