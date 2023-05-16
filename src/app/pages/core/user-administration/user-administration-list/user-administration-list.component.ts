import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import {
  MessageService, //UserAdministrationHttpService
} from '@services/core';
import { ColModel, PaginatorModel, UserModel } from '@models/core';

import { UserService } from '../../../../services/core/administrator/user.service';
import { KpiUser } from '@models/core/admin-user';
import { User } from '@models/authentication';

@Component({
  selector: 'app-user-administration-list',
  templateUrl: './user-administration-list.component.html',
})
export class UserAdministrationListComponent implements OnInit {
  /* users$ = this.userAdministrationHttpService.users$;
  user$ = this.userAdministrationHttpService.user$;
  loaded$ = this.userAdministrationHttpService.loaded$;
  paginator$ = this.userAdministrationHttpService.paginator$; */

  selectedUser: any = null;
  cols: ColModel[];
  items: MenuItem[] = [];
  isVisible: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  users: User[] = [];
  modelName: any;
  totalUsers: number = 0;
  kpiModel: KpiUser = new KpiUser();
  data: any[] = [];

  userVisualizations$ = this.userService.users$;

  constructor(
    //private userAdministrationHttpService: UserAdministrationHttpService,
    public messageService: MessageService,
    private userService: UserService
  ) {
    this.cols = [
      { field: 'username', header: 'Correo Electrónico' },
      { field: 'name', header: 'Nombres' },
      { field: 'lastname', header: 'Apellidos' },
      { field: 'role', header: 'Rol' },
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
    /*  this.paginator$.subscribe((response) => {
      this.paginator = response;
    }); */
  }

  ngOnInit(): void {
    this.getAllUSers();
    this.userVisualizations$.subscribe((response) => {
      //this.data = response;
      console.log('Que me trae aqui', response);
      this.setKpi();
    });
  }

  getAllUSers() {
    this.userService.getUsers().subscribe((data) => {
      console.log('USERS', data);
      this.users = data;
    });
  }

  editUser(user: User) {
    this.isVisible = true;
    this.selectedUser = user;
  }

  closeForm(state: boolean) {
    this.isVisible = state;
  }

  deleteUser(user: User) {
    this.messageService.questionDeleteUser({}).then((result) => {
      if (result.isConfirmed) {
        this.userService.removeUser(user.id).subscribe({
          next: (data) => {
            this.messageService.successUser(data);
          },
          complete: () => {
            this.getAllUSers();
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      }
    });
  }

  addUser(newUser: User) {
    console.log('Nuevo usuario', newUser);
    this.getAllUSers();
  }

  closeModal(state: boolean) {
    console.log('STATE FORM', state);
    this.isVisible = state;
  }

  setKpi() {
    this.kpiModel = new KpiUser();
    this.data.forEach((element) => {
      console.log('KPI', element);
    });
  }

  showForm(): void {
    this.isVisible = true;
    this.selectedUser = null;
  }

  selectUser(user: User) {
    // this.selectedUser = user;
    // console.log(user);
  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.getAllUSers();
    }
  }
}
