import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PlanificationCareerService } from '@services/cecy/coordinator-cecy';
import { MessageService } from '@services/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() coursesSearch = new EventEmitter<any>();
  searchValue: string = '';
  result: [] = [];

  constructor(
    private planificationCareerService: PlanificationCareerService,
    private router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSearchInput(): void {
    console.log('SEARCH', this.searchValue);
    if (this.searchValue === '') {
      this.router.navigate(['/cecy/assistant-cecy/courses']).then(() => {
        this.planificationCareerService.getPlanificationForState().subscribe({
          next: (data) => {
            this.coursesSearch.emit(data);
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      });
    } else {
      this.router
        .navigate(['/cecy/assistant-cecy/courses'], {
          queryParams: {
            search: this.searchValue,
          },
        })
        .then(() => {
          this.planificationCareerService
            .searchForState(this.searchValue)
            .subscribe({
              next: (data) => {
                console.log('SEARCH COURSES', data);
                this.coursesSearch.emit(data);
              },
              error: (error) => {
                console.error(error);
              },
            });
        });
    }
  }
}
