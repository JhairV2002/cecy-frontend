import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  // items: MenuItem[];
  // home: MenuItem;

  constructor() {}

  ngOnInit(): void {
    // this.items = [
    //   { label: 'Perfil' },
    // ];
    // this.home = {icon: 'pi pi-home', routerLink: '/'};
  }
}
