import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';

import { ColModel, PaginatorModel } from '@models/core';
import { InstructorHttpService } from '@services/cecy';
import { MessageService } from '@services/core';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.scss'],
})
export class InstructorListComponent implements OnInit {
  instructors$ = this.instructorHttpService.instructors$;
  instructor$ = this.instructorHttpService.instructor$;
  loaded$ = this.instructorHttpService.loaded$;
  paginator$ = this.instructorHttpService.paginator$;

  selectedInstructors: any[] = [];
  selectedInstructor: any = {};
  cols: ColModel[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;
  dialogLists: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};

  constructor(
    private instructorHttpService: InstructorHttpService,
    public messageService: MessageService
  ) {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'user', header: 'Identificación' },
      { field: 'user', header: 'Nombres' },
      { field: 'user', header: 'Apellidos' },
      // { field: 'email', header: 'Tipo de usuario' },
      { field: 'state', header: 'Estado del instructor' },
      { field: 'type', header: 'Tipo de instructor' },
    ];
    this.items = [
      {
        label: 'Eliminar instructor',
        icon: 'pi pi-key',
        command: () => {
          this.deleteInstructor(this.selectedInstructor);
        },
      },
    ];
    this.paginator$.subscribe((response) => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors(page: number = 1) {
    this.instructors$ = this.instructorHttpService.getInstructors(
      page,
      this.search.value
    );
  }

  showForm(instructor: any = {}) {
    this.selectedInstructor = instructor;
    this.instructorHttpService.selectInstructor(instructor);
    this.dialogForm = true;
  }

  showUsers() {
    this.dialogLists = true;
  }

  selectInstructor(instructor: any) {
    this.selectedInstructor = instructor;
  }

  deleteInstructor(instructor: any): void {
    this.messageService.questionDelete({}).then((result) => {
      if (result.isConfirmed) {
        this.instructorHttpService.deleteInstructor(instructor.id!).subscribe(
          (response) => {
            this.messageService.success(response);
          },
          (error) => {
            this.messageService.error(error);
          }
        );
      }
    });
  }

  deleteInstructors(): void {
    this.messageService.questionDelete({}).then((result) => {
      if (result.isConfirmed) {
        const ids = this.selectedInstructors.map((element) => element.id);
        this.progressBarDelete = true;
        this.instructorHttpService.deleteInstructors(ids).subscribe(
          (response) => {
            this.progressBarDelete = false;
            this.messageService.success(response);
          },
          (error) => {
            this.progressBarDelete = false;
            this.messageService.error(error);
          }
        );
      }
    });
  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadInstructors(1);
    }
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadInstructors(this.paginator.current_page);
  }
}
