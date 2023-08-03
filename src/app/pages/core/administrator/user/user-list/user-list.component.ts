import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { Socket } from 'ngx-socket-io';

import { MessageService } from '@services/core';
import { ColModel } from '@models/core';

import { UserService } from '@services/core/administrator/user.service';
import { KpiUser } from '@models/core/admin-user';
import { User } from '@models/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  /* users$ = this.userAdministrationHttpService.users$;
  user$ = this.userAdministrationHttpService.user$;
  paginator$ = this.userAdministrationHttpService.paginator$; */

  loading$ = this.userService.loading$;
  selectedUser: any = null;
  cols: ColModel[];
  items: MenuItem[] = [];
  isVisible: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  users: User[] = [];
  modelName: any;
  totalUsers: number = 0;
  kpiModel: KpiUser = new KpiUser();
  data: any[] = [];
  userVisualizations$ = this.userService.users$;
  constructor(
    //private userAdministrationHttpService: UserAdministrationHttpService,
    public messageService: MessageService,
    private userService: UserService,
    private socket: Socket,
    private router: Router
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
    this.checkSearchParams();
  }

  ngOnInit(): void {
    this.getAllUSers();
    this.userVisualizations$.subscribe((response) => {
      //this.data = response;
      console.log('Que me trae aqui', response);
      this.setKpi();
    });

    this.socket.on('connect', () => {
      console.log('SOCKET CONECT');
      this.socket.on('all-planification', (data: any) => {
        console.log('PLANIFICACIONES', data);
      });
    });
  }

  checkSearchParams(): void {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    if (queryParams['search']) {
      history.replaceState(null, '', '/administrator/users');
    }
  }

  getAllUSers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.users.sort((a: any, b: any) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
      },
      error: (error) => {
        this.messageService.error(error);
      },
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
            this.getAllUSers();
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      }
    });
  }

  changePassword(user: User) {
    console.log(user);
    const encodedHash = encodeURIComponent(user.password!);
    this.router.navigate([
      `/administrator/users/change-password/user/${user.id}/encrypted/${encodedHash}`,
    ]);
  }

  addUser(newUser: User) {
    console.log('Nuevo usuario', newUser);
    this.getAllUSers();
  }

  searchUsers(users: any) {
    this.users = users;
    console.log('ESTO BUSCO', users);
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
}
