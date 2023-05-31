import { Component, OnInit } from '@angular/core';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-poa-form',
  templateUrl: './poa-form.component.html',
  styleUrls: ['./poa-form.component.scss'],
})
export class PoaFormComponent implements OnInit {
  value: Date = new Date();
  cities: City[];

  selectedCity: City = {
    name: '',
    code: ''
  };
  constructor() {
    this.cities = [
      { name: '', code: '' },
      { name: 'Rector', code: 'RM' },
      { name: 'Vicerector', code: 'LDN' },
    ];
  }

  ngOnInit(): void {}
}
