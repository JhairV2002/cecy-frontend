import { Component, OnInit } from '@angular/core';
import {RequirementModel} from "@models/cecy";
import {ColModel, PaginatorModel} from "@models/core";
import {MenuItem} from "primeng/api";
import {FormControl} from "@angular/forms";
import {MessageService} from "@services/core";
import {RequirementHttpService} from "@services/cecy";

@Component({
  selector: 'app-requirement-list',
  templateUrl: './requirement-list.component.html',
  styleUrls: ['./requirement-list.component.scss']
})
export class RequirementListComponent implements OnInit {

  requirements$ = this.requirementHttpService.requirements$;
  requirement$ = this.requirementHttpService.requirement$;
  loaded$ = this.requirementHttpService.loaded$;
  paginator$ = this.requirementHttpService.paginator$;

  selectedRequirements: RequirementModel[] = [];
  selectedRequirement: RequirementModel = {};
  cols: ColModel[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};

  constructor(private requirementHttpService: RequirementHttpService,
              public messageService: MessageService) {
    this.cols = [
      {field: 'name', header: 'Nombre'},
      {field: 'required', header: 'Requerido'},
      {field: 'state', header: 'Estado'},
    ];
    this.items = [
      {
        label: 'Eliminar Requisito',
        icon: 'pi pi-user-minus',
        command: () => {
          this.deleteRequirement(this.selectedRequirement);
        }
      },
    ];
    this.paginator$.subscribe(response => {
      this.paginator = response;
    });
  }

  ngOnInit(): void {
    this.loadRequirements();
  }

  loadRequirements(page: number = 1) {
    this.requirements$ = this.requirementHttpService.getRequirements(page, this.search.value);
  }

  // optional
  showForm(requirement: RequirementModel = {}) {
    this.selectedRequirement = requirement;
    this.requirementHttpService.selectRequirement(requirement); // pendiente
    this.dialogForm = true;
  }

  selectRequirement(requirement: RequirementModel) {
    this.selectedRequirement = requirement;
  }

  deleteRequirement(requirement: RequirementModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.requirementHttpService.deleteRequirement(requirement.id!).subscribe(
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

  deleteRequirements(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          const ids = this.selectedRequirements.map(element => element.id);
          this.progressBarDelete = true;
          this.requirementHttpService.deleteRequirements(ids).subscribe(
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
      this.loadRequirements(1);
    }
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadRequirements(this.paginator.current_page);
  }
}
