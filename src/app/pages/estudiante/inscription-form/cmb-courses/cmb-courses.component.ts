import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Courses } from '@models/cecy';
import { CoursesService } from '@services/cecy';

@Component({
  selector: 'app-cmb-courses',
  templateUrl: './cmb-courses.component.html',
})
export class CmbCoursesComponent implements OnInit {
  constructor(private CoursesService: CoursesService) { }

  listCourses: Courses[] = [];
  @Output() idEmitter = new EventEmitter<string>();
  @Input() id: string = '';

  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.CoursesService.getviewCourses().subscribe((response) =>
      response.forEach((t) => {
        this.listCourses.push(t);
      })
    );
  }

  public onSelect(id: any) {
    console.log(id);
    this.idEmitter.emit(id);
  }
}
