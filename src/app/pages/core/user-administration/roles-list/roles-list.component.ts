import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ColModel, PaginatorModel, UserModel } from '@models/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from '@services/core';
import { Roles } from '@models/authentication';
import { RolesService } from '@services/core/administrator';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css'],
})
export class RolesListComponent implements OnInit {
  selectedRole: any = null;
  cols: ColModel[] = [];
  items: MenuItem[] = [];
  isVisible: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  roles: Roles[] = [];
  modelName: any;
  totalUsers: number = 0;
  // kpiModel: KpiUser = new KpiUser();
  data: any[] = [];
  constructor(
    public messageService: MessageService,
    private roleService: RolesService
  ) {
    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'Description', header: 'Descripción' },
      { field: 'createdAt', header: 'Fecha creación' },
      { field: 'updatedAt', header: 'Última actualización' },
    ];
    this.items = [
      {
        label: 'Cambiar Contraseña',
        icon: 'pi pi-key',
        command: () => {
          //this.changePassword();
        },
      },
      {
        label: 'Eliminar Usuario',
        icon: 'pi pi-user-minus',
        command: () => {
          //this.deleteUser(id);
        },
      },
      {
        label: 'Cambiar Roles',
        icon: 'pi pi-id-card',
        command: () => {
          //this.changePassword();
        },
      },
      /* {
        label: 'Cambiar Permisos',
        icon: 'pi pi-sitemap',
        command: () => {
          this.changePassword();
        },
      }, */
    ];
  }
  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleService.getRoles().subscribe((data) => {
      console.log('ROLES', data);
      this.roles = data;
    });
  }

  editRole(role: Roles) {}

  deleteRole(role: Roles) {}

  addRole(newRole: Roles) {
    console.log('Nuevo usuario', newRole);
    this.getAllRoles();
  }

  showForm(): void {
    this.isVisible = true;
    this.selectedRole = null;
  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.getAllRoles();
    }
  }
}
