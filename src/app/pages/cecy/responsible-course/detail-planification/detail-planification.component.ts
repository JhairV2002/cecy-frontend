import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-detail-planification',
  templateUrl: './detail-planification.component.html',
  styleUrls: ['./detail-planification.component.scss']
})
export class DetailPlanificationComponent implements OnInit {

  id: number;
  items: MenuItem[];
  home: MenuItem;

  constructor(
    private activatedRoute: ActivatedRoute,
    private   location: Location,
    public window:Window
  ) {
    console.log(window.history)
    this.id = this.activatedRoute.snapshot.params['id'];
    this.items = [
      // { label: 'Planificaciones', routerLink: this.location.back() },
      // { label: 'Planificaciones', routerLink: '/cecy/responsible-course/horarios' },
      { label: 'Planificaciones', routerLink: '/cecy/responsible-course/horarios' },
      { label: 'Editar Planificación' },
    ];
    this.home = { icon: 'pi pi-home' };
  }


  ngOnInit() {

  }
}
