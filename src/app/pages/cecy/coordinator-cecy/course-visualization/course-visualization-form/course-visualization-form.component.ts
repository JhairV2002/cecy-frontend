import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-course-visualization-form',
  templateUrl: './course-visualization-form.component.html',
  styleUrls: ['./course-visualization-form.component.scss']
})
export class CourseVisualizationFormComponent implements OnInit {

  @Output() dialogForm = new EventEmitter<boolean>();
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
