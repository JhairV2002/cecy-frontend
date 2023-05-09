import { Component, OnInit } from '@angular/core';
import { SchoolPeriodModel} from "@models/cecy";
import {SchoolPeriodHttpService} from "@services/cecy/school-period-http.service";

@Component({
  selector: 'app-instructor-course',
  templateUrl: './instructor-course.component.html',
  styleUrls: ['./instructor-course.component.scss']
})
export class InstructorCourseComponent implements OnInit {

  periods: SchoolPeriodModel[] = [];
  selectedPeriods: string = '';
  value1: string = '';
  constructor(private api: SchoolPeriodHttpService) {}

  ngOnInit(): void {
    this.getSchoolPeriods();

  }
  getSchoolPeriods(){
    this.api.getSchoolPeriods().subscribe( response =>{
      console.log(response.data);
      this.periods = response.data
    })
  }


}
