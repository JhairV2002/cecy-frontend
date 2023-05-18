import { Component, OnInit } from '@angular/core';
import {ColModel, PaginatorModel} from "@models/core";
import {MenuItem} from "primeng/api";
import {FormControl} from "@angular/forms";
import {MessageService} from "@services/core/message.service";
import {DetailSchoolPeriodHttpService} from "@services/cecy/detail-school-period-http.service";
import {DetailSchoolPeriodModel} from "@models/cecy";

@Component({
  selector: 'app-detail-school-period-list',
  templateUrl: './detail-school-period-list.component.html',
  styleUrls: ['./detail-school-period-list.component.scss']
})
export class DetailSchoolPeriodListComponent implements OnInit {

  detailSchoolPeriods$ = this.detailSchoolPeriodHttpService.detailSchoolPeriods$;
  detailSchoolPeriod$ = this.detailSchoolPeriodHttpService.detailSchoolPeriod$;
  loaded$ = this.detailSchoolPeriodHttpService.loaded$;
  paginator$ = this.detailSchoolPeriodHttpService.paginator$;

  selectedDetailSchoolPeriods: DetailSchoolPeriodModel[] = [];
  selectedDetailSchoolPeriod: DetailSchoolPeriodModel = {};
  cols: ColModel[]; // conditional
  items: MenuItem[] = []; // optional
  dialogForm: boolean = false; // optional
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};

  constructor(private detailSchoolPeriodHttpService: DetailSchoolPeriodHttpService,
              public messageService: MessageService) {
    this.cols = [
      {field: 'schoolPeriod', header: 'Periodo Lectivo'},
      {field: 'especialStartedAt', header: 'Inicio Especial'},
      {field: 'especialEndedAt', header: 'Fin Especial'},
      {field: 'extraordinaryStartedAt', header: 'Inicio Extraordinaria'},
      {field: 'extraordinaryEndedAt', header: 'Fin Extraordinaria'},
      {field: 'nullificationStartedAt', header: 'Inicio Extraordinaria'},
      {field: 'nullificationEndedAt', header: 'Fin Anulacion'},
      {field: 'ordinaryStartedAt', header: 'Inicio Extraordinaria'},
      {field: 'ordinaryEndedAt', header: 'Fin Ordinaria'},
    ];
    this.items = [
      {
        label: 'Eliminar Detalle del Periodo',
        icon: 'pi pi-user-minus',
        command: () => {
          this.deleteDetailSchoolPeriod(this.selectedDetailSchoolPeriod);
        }
      },
    ];
    this.paginator$.subscribe(response => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadDetailSchoolPeriods();
  }

  loadDetailSchoolPeriods(page: number = 1) {
    this.detailSchoolPeriods$ = this.detailSchoolPeriodHttpService.getDetailSchoolPeriods(page);
  }

  // optional
  showForm(detailSchoolPeriod: DetailSchoolPeriodModel = {}) {
    this.selectedDetailSchoolPeriod = detailSchoolPeriod;
    this.detailSchoolPeriodHttpService.selectDetailSchoolPeriod(detailSchoolPeriod); // pendiente
    this.dialogForm = true;
  }

  selectDetailSchoolPeriod(detailSchoolPeriod: DetailSchoolPeriodModel) {
    this.selectedDetailSchoolPeriod = detailSchoolPeriod;
  }

  deleteDetailSchoolPeriod(detailSchoolPeriod: DetailSchoolPeriodModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.detailSchoolPeriodHttpService.deleteDetailSchoolPeriod(detailSchoolPeriod.id!).subscribe(
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

  deleteDetailSchoolPeriods(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          const ids = this.selectedDetailSchoolPeriods.map(element => element.id);
          this.progressBarDelete = true;
          this.detailSchoolPeriodHttpService.deleteDetailSchoolPeriods(ids).subscribe(
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
      this.loadDetailSchoolPeriods(1);
    }
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadDetailSchoolPeriods(this.paginator.current_page);
  }
}
