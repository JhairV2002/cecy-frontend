import { Component, OnInit } from '@angular/core';
import {SchoolPeriodModel} from "@models/cecy";
import {ColModel, PaginatorModel} from "@models/core";
import {MenuItem} from "primeng/api";
import {FormControl} from "@angular/forms";
import {MessageService} from "@services/core";
import {SchoolPeriodHttpService} from "@services/cecy/school-period-http.service";

@Component({
  selector: 'app-school-period-list',
  templateUrl: './school-period-list.component.html',
  styleUrls: ['./school-period-list.component.scss']
})
export class SchoolPeriodListComponent implements OnInit {

  schoolPeriods$ = this.schoolPeriodHttpService.schoolPeriods$;
  schoolPeriod$ = this.schoolPeriodHttpService.schoolPeriod$;
  loaded$ = this.schoolPeriodHttpService.loaded$;
  paginator$ = this.schoolPeriodHttpService.paginator$;

  selectedSchoolPeriods: SchoolPeriodModel[] = [];
  selectedSchoolPeriod: SchoolPeriodModel = {};
  cols: ColModel[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};

  constructor(private schoolPeriodHttpService: SchoolPeriodHttpService,
              public messageService: MessageService) {
    this.cols = [
      {field: 'name', header: 'Nombre'},
      {field: 'code', header: 'Codigo'},
      {field: 'endedAt', header: 'Fecha de Finalización'},
      {field: 'startedAt', header: 'Fecha de Inicio'},
      {field: 'minimumNote', header: 'Nota Minima'},
    ];
    this.items = [
      {
        label: 'Eliminar Periodo',
        icon: 'pi pi-user-minus',
        command: () => {
          this.deleteSchoolPeriod(this.selectedSchoolPeriod);
        }
      },
    ];
    this.paginator$.subscribe(response => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadSchoolPeriods();
  }

  loadSchoolPeriods(page: number = 1) {
    this.schoolPeriods$ = this.schoolPeriodHttpService.getSchoolPeriods(page, this.search.value);
  }

  // optional
  showForm(schoolPeriod: SchoolPeriodModel = {}) {
    this.selectedSchoolPeriod = schoolPeriod;
    this.schoolPeriodHttpService.selectSchoolPeriod(schoolPeriod); // pendiente
    this.dialogForm = true;
  }

  selectSchoolPeriod(schoolPeriod: SchoolPeriodModel) {
    this.selectedSchoolPeriod = schoolPeriod;
  }

  deleteSchoolPeriod(schoolPeriod: SchoolPeriodModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.schoolPeriodHttpService.deleteSchoolPeriod(schoolPeriod.id!).subscribe(
            response => {
              this.messageService.success(response);
            },
            error => {
              this.messageService.error(error);
            }
          );
        }
      });
  }

  deleteSchoolPeriods(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          const ids = this.selectedSchoolPeriods.map(element => element.id);
          this.progressBarDelete = true;
          this.schoolPeriodHttpService.deleteSchoolPeriods(ids).subscribe(
            response => {
              this.progressBarDelete = false;
              this.messageService.success(response);
            },
            error => {
              this.progressBarDelete = false;
              this.messageService.error(error);
            }
          );
        }
      });
  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadSchoolPeriods(1);
    }
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadSchoolPeriods(this.paginator.current_page);
  }
}
