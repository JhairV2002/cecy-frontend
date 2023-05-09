import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CourseModel } from '@models/cecy';
import { ColModel, PaginatorModel } from '@models/core';
import { CourseHttpService } from '@services/cecy/course-http.service';
import { MessageService } from '@services/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-report-need',
  templateUrl: './report-need.component.html',
  styleUrls: ['./report-need.component.scss']
})
export class ReportNeedComponent implements OnInit {


  informNeeds$ = this.courseHttpService.courses$;
  selectedValues: string[] = ['val1', 'val2'];


  constructor(private courseHttpService: CourseHttpService, private messageService: MessageService) { }



  ngOnInit(): void {
  }

  showInformCourseNeeds(course: CourseModel) {
    this.informNeeds$ = this.courseHttpService.showInformCourseNeeds(course.id)
  }


}
