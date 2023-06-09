import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Catalogue } from '@models/cecy';
import { CatalogueService } from '@services/cecy';

@Component({
  selector: 'app-cmb-gender',
  templateUrl: './cmb-gender.component.html',
  styleUrls: ['./cmb-gender.component.css']
})
export class CmbGenderComponent implements OnInit {
  constructor(private CatalogueService: CatalogueService) { }

  gender: Catalogue[] = [];
  @Output() idEmitter = new EventEmitter<number>();
  @Input() id: number | undefined = 0;

  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.CatalogueService.findAll().subscribe(
      (response) =>
        response.forEach((t) => {
          if (t.nombre == 'genero') {
            this.gender.push(t)
          }
        })
    )
  }

  public onSelect(id: string) {
    console.log("El sexo es:" + id);
    this.idEmitter.emit(parseInt(id));
  }
}
