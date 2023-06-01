import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Catalogue } from '@models/cecy';
import { CatalogueService } from '@services/cecy';

@Component({
  selector: 'app-cmb-publicity',
  templateUrl: './cmb-publicity.component.html'
})
export class CmbPublicityComponent implements OnInit {
  constructor(private catalogueService: CatalogueService){}

  publicities: Catalogue[] = [];
  @Output() idEmitter = new EventEmitter<number>();
  @Input() id: number = 0;
  roles: string = 'roles'

  ngOnInit(): void {
      this.findByCode();
  }

  public findAll():void{
    this.catalogueService.findAll().subscribe(
      (response) =>
        this.publicities = response
    )
  }

  public findByCode(): void {
    this.catalogueService.findAll().subscribe(
      (response) =>
      response.forEach((t) => {
        if (t.nombre == 'publicidad') {
          this.publicities.push(t)
        }
      })
    )
  }

  public onSelect(id: string ){
    this.idEmitter.emit(parseInt(id));
  }

}
