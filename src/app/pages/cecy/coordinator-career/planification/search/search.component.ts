import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  CareersService,
  PlanificationsCoursesService,
} from '@services/cecy/coordinator-career';
import { MessageService } from '@services/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() selectedCareer: number = 0;
  @Output() planificationCourses = new EventEmitter<any>();
  searchValue: string = '';

  constructor(
    private router: Router,
    private planificationCourseService: PlanificationsCoursesService,
    private careersService: CareersService,
    public messageService: MessageService
  ) { }

  onSearchInputChange(): void {
    console.log('SEARCH', this.searchValue);
    if (this.searchValue === '') {
      this.router
        .navigate(['/cecy/coordinator-career/planification'])
        .then(() => {
          this.careersService
            .getPlanificationsCareers(this.selectedCareer)
            .subscribe({
              next: (data) => {
                console.log('ESTO ME TRAJO CON EL STRING VACIO', data);
                this.planificationCourses.emit(data.planificationCourse);
              },
              error: (error) => {
                this.messageService.error(error);
              },
            });
        });
    } else {
      this.router
        .navigate(['/cecy/coordinator-career/planification'], {
          queryParams: {
            search: this.searchValue,
            careerId: this.selectedCareer,
          },
        })
        .then(() => {
          const careerSelected = localStorage.getItem('careerSelected');
          if (careerSelected) {
            console.log('ID CARRERA', this.selectedCareer);
            this.planificationCourseService
              .searchPlanificationsByCareer(
                this.searchValue,
                this.selectedCareer
              )
              .subscribe({
                next: (data) => {
                  this.planificationCourses.emit(data);
                },
                error: (error) => {
                  console.error(error);
                },
              });
          }
        });
    }
  }
}
