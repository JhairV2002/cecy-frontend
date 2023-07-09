import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@services/layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  selectedEnvironment: string = 'local';
  environments: any[] = [];
  constructor(public layoutService: LayoutService) {
    this.environments = [
      { value: 'produccion', name: 'Producción' },
      { value: 'pruebas', name: 'Pruebas' },
      { value: 'local', name: 'Local' },
    ];
  }

  ngOnInit(): void {}
  getCurrentYear() {
    return new Date().getFullYear();
  }

  onchange(event: any) {
    this.selectedEnvironment = event.value.name;
    console.log('ENV', (this.selectedEnvironment = event.value.name));
  }
}
