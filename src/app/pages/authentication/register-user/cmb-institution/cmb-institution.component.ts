import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Institution } from '@models/cecy';
import { InstitutionService } from '@services/cecy';

@Component({
  selector: 'app-cmb-institution',
  templateUrl: './cmb-institution.component.html',
  styleUrls: ['./cmb-institution.component.css']
})
export class CmbInstitutionComponent {
  constructor(private InstitutionService: InstitutionService){}

  listInstitution: Institution[] = [];
  @Output() idEmitter = new EventEmitter<number>();
  @Input() id: number = 0;

  ngOnInit(): void {
      this.findAll();
  }

  public findAll():void{
    this.InstitutionService.findAll().subscribe(
      (response) =>
      response.forEach((t) => {
          this.listInstitution.push(t)
      })
    )
  }

  public onSelect(id: string ){
    console.log("la institution es:" + id);
    this.idEmitter.emit(parseInt(id));
  }
}
