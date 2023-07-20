import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ColModel } from '@models/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from '@services/core';
import { Roles } from '@models/authentication';
import { RolesService } from '@services/core/administrator';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  loading$ = this.roleService.loading$;
  selectedRole: any = null;
  cols: ColModel[] = [];
  items: MenuItem[] = [];
  isVisible: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: any = {};
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

  editRole(role: Roles) {
    this.isVisible = true;
    this.selectedRole = role;
  }

  deleteRole(role: Roles) {
    this.messageService.questionDelete({}).then((result) => {
      if (result.isConfirmed) {
        this.roleService.deleteRole(role.id).subscribe({
          next: (data) => {
            this.messageService.successRol(data);
            this.getAllRoles();
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      }
    });
  }

  addRole(newRole: Roles) {
    console.log('Nuevo usuario', newRole);
    this.getAllRoles();
  }

  showForm(): void {
    console.log('ABRE FORMULARIO');
    this.isVisible = true;
    this.selectedRole = null;
  }

  closeModal(state: boolean) {
    console.log('STATE FORM', state);
    this.isVisible = state;
  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.getAllRoles();
    }
  }
}
