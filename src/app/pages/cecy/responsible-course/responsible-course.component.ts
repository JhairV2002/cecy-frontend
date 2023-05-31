import { Component, OnInit } from '@angular/core';
import { CourseModel } from '@models/cecy';
import { CourseHttpService } from '@services/cecy';

@Component({
  selector: 'app-responsible-course',
  templateUrl: './responsible-course.component.html',
  styleUrls: ['./responsible-course.component.scss']
})
export class ResponsibleCourseComponent {

  constructor(private coursesHttpService: CourseHttpService) {
  }
}
