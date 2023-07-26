import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Careers } from '@models/cecy/coordinator-career';
import { ColModel } from '@models/core';
import { CareersService } from '@services/cecy/coordinator-career';
import { MessageService } from '@services/core';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.css'],
})
export class CareerListComponent implements OnInit {
  loading$ = this.careerService.loading$;
  selectedCareer: any = null;
  cols: ColModel[];
  isVisible: boolean = false;
  careers: Careers[] = [];
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  constructor(
    private careerService: CareersService,
    public messageService: MessageService
  ) {
    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'createdAt', header: 'Fecha creación' },
      { field: 'updatedAt', header: 'Última actualización' },
    ];
  }
  ngOnInit(): void {
    this.getAllCareers();
  }

  getAllCareers() {
    this.careerService.getCareers().subscribe((data) => {
      console.log('CARRERAS', data);
      this.careers = data;
    });
  }

  editCareer(career: Careers) {
    this.isVisible = true;
    this.selectedCareer = career;
  }

  deleteCareer(career: Careers) {
    this.messageService.questionDelete({}).then((result) => {
      if (result.isConfirmed) {
        this.careerService.deleteCareerById(career.id).subscribe({
          next: (data) => {
            this.messageService.successRol(data);
            this.getAllCareers();
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      }
    });
  }

  addCareer(newCareer: Careers) {
    console.log('NUEVA CARRERA', newCareer);
    this.getAllCareers();
  }

  showForm(): void {
    this.isVisible = true;
    this.selectedCareer = null;
  }

  closeModal(state: boolean) {
    console.log('STATE FORM', state);
    this.isVisible = state;
  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.getAllCareers();
    }
  }
}
