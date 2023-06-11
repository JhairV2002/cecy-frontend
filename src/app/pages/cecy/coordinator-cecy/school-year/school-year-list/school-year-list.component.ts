import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ColModel, PaginatorModel, UserModel } from '@models/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from '@services/core';
import { SchoolYearService } from '@services/cecy/coordinator-cecy';
import { SchoolYear } from '@models/cecy/coordinator-career';

@Component({
  selector: 'app-school-year-list',
  templateUrl: './school-year-list.component.html',
  styleUrls: ['./school-year-list.component.css'],
})
export class SchoolYearListComponent implements OnInit {
  selectedSchoolYear: any = null;
  cols: ColModel[] = [];
  items: MenuItem[] = [];
  isVisible: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  schoolPeriods: SchoolYear[] = [];
  modelName: any;
  totalUsers: number = 0;
  // kpiModel: KpiUser = new KpiUser();
  data: any[] = [];
  constructor(
    public messageService: MessageService,
    private schoolYearService: SchoolYearService
  ) {
    this.cols = [
      { field: 'year', header: 'Año' },
      { field: 'createdAt', header: 'Fecha creación' },
      { field: 'updatedAt', header: 'Última actualización' },
    ];
  }
  ngOnInit(): void {
    this.getAllSchoolPeriods();
  }

  getAllSchoolPeriods() {
    this.schoolYearService.getSchoolYear().subscribe((data) => {
      console.log('PERIODOS LECTIVOS', data);
      this.schoolPeriods = data;
    });
  }

  editRole(schoolYear: SchoolYear) {
    this.isVisible = true;
    this.selectedSchoolYear = schoolYear;
  }

  deleteRole(schoolYear: SchoolYear) {
    this.messageService.questionDelete({}).then((result) => {
      if (result.isConfirmed) {
        this.schoolYearService.deleteSchoolYear(schoolYear.id).subscribe({
          next: (data) => {
            this.messageService.successRol(data);
            this.getAllSchoolPeriods();
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      }
    });
  }

  addSchoolYear(newSchoolYear: SchoolYear) {
    console.log('NUEVO PERIODO LECTIVO', newSchoolYear);
    this.getAllSchoolPeriods();
  }

  showForm(): void {
    console.log('ABRE FORMULARIO');
    this.isVisible = true;
    this.selectedSchoolYear = null;
  }

  closeModal(state: boolean) {
    console.log('STATE FORM', state);
    this.isVisible = state;
  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.getAllSchoolPeriods();
    }
  }
}
