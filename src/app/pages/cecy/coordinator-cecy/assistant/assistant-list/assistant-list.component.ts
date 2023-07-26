import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';

import { MessageService } from '@services/core';
import { ColModel } from '@models/core';

import { UserService } from '@services/core/administrator/user.service';
import { KpiUser } from '@models/core/admin-user';
import { User } from '@models/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistant-list',
  templateUrl: './assistant-list.component.html',
  styleUrls: ['./assistant-list.component.css'],
})
export class AssistantListComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private userService: UserService,
    private router: Router
  ) {
    this.cols = [
      { field: 'username', header: 'Correo Electrónico' },
      { field: 'name', header: 'Nombres' },
      { field: 'lastname', header: 'Apellidos' },
      { field: 'role', header: 'Rol' },
      { field: 'updatedAt', header: 'Última actualización' },
    ];
  }
  loading$ = this.userService.loading$;
  selectedUser: any = null;
  cols: ColModel[];
  items: MenuItem[] = [];
  isVisible: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: any = {};
  assistants: User[] = [];
  modelName: any;
  totalUsers: number = 0;
  kpiModel: KpiUser = new KpiUser();
  data: any[] = [];
  userVisualizations$ = this.userService.users$;

  ngOnInit(): void {
    this.getAllAssitents();
    this.userVisualizations$.subscribe((response) => {
      //this.data = response;
      console.log('Que me trae aqui', response);
      this.setKpi();
    });
  }

  checkSearchParams(): void {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    if (queryParams['search']) {
      history.replaceState(null, '', '/administrator/users');
    }
  }

  getAllAssitents() {
    this.userService.getAssistants().subscribe({
      next: (data) => {
        console.log('ASSISTENTES ALL', data);
        this.assistants = data;
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
            this.getAllAssitents();
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
    this.getAllAssitents();
  }

  searchAssistant(users: any) {
    this.assistants = users;
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
