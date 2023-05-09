import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel, InstructorModel } from '@models/cecy';
import { ColModel, PaginatorModel, UserModel } from '@models/core';
import { InstitutionHttpService } from '@services/cecy';
import { InstructorHttpService } from '@services/cecy/instructor-http.service';
import { AuthService, MessageService, UserAdministrationHttpService } from '@services/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-assignment-instructor-list',
  templateUrl: './assignment-instructor-list.component.html',
  styleUrls: ['./assignment-instructor-list.component.scss']
})
export class AssignmentInstructorListComponent implements OnInit {

  users$ = this.userAdministrationHttpService.users$;
  user$ = this.userAdministrationHttpService.user$;
  loaded$ = this.userAdministrationHttpService.loaded$;
  paginator$ = this.userAdministrationHttpService.paginator$;

  selectedUsers: UserModel[] = [];
  selectedUser: UserModel[] = [];
  UserModel = {};
  cols: ColModel[];
  items: MenuItem[] = [];
  paginator: PaginatorModel = {};
  courses: CourseModel[] = [];
  search: FormControl = new FormControl('');
  public planificationId: any = this.activatedRoute.snapshot.params['id'];

  constructor(private activatedRoute: ActivatedRoute,
    private userAdministrationHttpService: UserAdministrationHttpService,
    private instructorHttpService: InstructorHttpService,
    public messageService: MessageService,
    private router:Router) {
    this.cols = [
      {field: 'username', header: 'Cédula'},
      {field: 'name', header: 'Nombres'},
      {field: 'lastname', header: 'Apellidos'},
      {field: 'email', header: 'Correo'},
    ];
    
    this.paginator$.subscribe(response => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1) {
    this.users$ = this.userAdministrationHttpService.getUsers(page, this.search.value);
  }
  changeState() {

  }

  // selectUser(user: UserModel): void {
  //   this. selectedUsers = user;
  // }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadUsers(1);
    }
  }
  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadUsers(this.paginator.current_page);
  }

  redirect(){
    this.router.navigate(['/cecy/coordinator-cecy/assignmented-instructor']);
  }
  
  storeInstructor(instructor: InstructorModel): void {
    this.instructorHttpService.storeInstructor(instructor).subscribe(
      response => {
        this.messageService.success(response);
      },
      error => {
        this.messageService.error(error);
      }
    );
  }
 

}
