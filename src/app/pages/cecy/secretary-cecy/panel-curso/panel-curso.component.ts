import { Component, OnInit } from '@angular/core';
import { VisualizationCoursesService } from '@services/cecy/secretary-cecy';
import { Curso } from '@models/cecy/secretary-cecy';
@Component({
  selector: 'app-panel-curso',
  templateUrl: './panel-curso.component.html'
})
export class PanelCursoComponent implements OnInit {
  constructor(
    private visualizationCoursesService: VisualizationCoursesService
  ) {}

  cursoList: Curso[] = [];
  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.visualizationCoursesService.findAll().subscribe((response: any) => {
      this.cursoList = response;
    });
  }
}
