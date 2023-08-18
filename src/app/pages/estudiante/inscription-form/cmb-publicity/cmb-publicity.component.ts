import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Catalogue } from '@models/cecy';
import { CatalogueService } from '@services/cecy';

@Component({
  selector: 'app-cmb-publicity',
  templateUrl: './cmb-publicity.component.html',
})
export class CmbPublicityComponent implements OnInit {
  constructor(private catalogueService: CatalogueService) { }

  publicities: Catalogue[] = [];
  @Output() publicity = new EventEmitter<any>();
  @Input() id: number = 0;
  @Input() nombre!: string;
  roles: string = 'roles';

  ngOnInit(): void {
    this.findByNombre();
  }

  public findAll(): void {
    this.catalogueService
      .findAll()
      .subscribe((response) => (this.publicities = response));
  }

  public findByCode(): void {
    this.catalogueService.findAll().subscribe((response) =>
      response.forEach((t) => {
        if (t.nombre == 'publicidad') {
          this.publicities.push(t);
        }
      })
    );
  }

  public onSelect(publicity: any) {
    console.log(publicity);
    this.publicity.emit(JSON.parse(publicity));
  }

  findByNombre() {
    this.catalogueService.findByNombre(this.nombre).subscribe((res) => {
      this.publicities = res;
      console.log(res);
    });
  }
}
