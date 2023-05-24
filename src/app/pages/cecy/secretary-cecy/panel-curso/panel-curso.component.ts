import { Component, OnInit } from '@angular/core';
import { VisualizationCoursesService } from '@services/cecy/secretary-cecy';
import { PlanificationCourses } from '@models/cecy/coordinator-career';
@Component({
  selector: 'app-panel-curso',
  templateUrl: './panel-curso.component.html',
  styleUrls: ['./panel-curso.component.css'],
})
export class PanelCursoComponent implements OnInit {
  constructor(
    private visualizationCoursesService: VisualizationCoursesService
  ) {}

  cursoList: PlanificationCourses[] = [];
  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.visualizationCoursesService.findAll().subscribe((response: any) => {
      this.cursoList = response;
    });
  }
}
