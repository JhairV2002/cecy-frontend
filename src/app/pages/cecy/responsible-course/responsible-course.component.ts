import { Component, OnInit } from '@angular/core';
import { CourseModel } from '@models/cecy';
import { CourseHttpService } from '@services/cecy';

@Component({
  selector: 'app-responsible-course',
  templateUrl: './responsible-course.component.html',
})
export class ResponsibleCourseComponent {

  constructor(private coursesHttpService: CourseHttpService) {
  }
}
