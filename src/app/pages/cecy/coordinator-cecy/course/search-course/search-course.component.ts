import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlanificationCareerService } from '@services/cecy/coordinator-cecy';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss'],
})
export class SearchCourseComponent implements OnInit {
  search = new FormControl('');
  result: [] = [];

  constructor(private planificationCareerService: PlanificationCareerService) {}

  ngOnInit(): void {
    this.filter();
  }
  filter() {
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((search) => {
      console.log('Buscando', search);
      this.filterSearchName(search);
    });
  }

  filterSearchName(value: string) {
    this.planificationCareerService
      .filterByName(value)
      .pipe()
      .subscribe((data) => {
        console.log('Buscando', data);
        this.result = data;
      });
  }
}
