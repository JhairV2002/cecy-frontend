import { Component, OnInit } from '@angular/core';
import { VisualizationCoursesService } from '@services/cecy/secretary-cecy';
import { Course } from '@models/cecy/secretary-cecy';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';
@Component({
  selector: 'app-panel-curso',
  templateUrl: './panel-curso.component.html'
})
export class PanelCursoComponent implements OnInit {
  constructor(
    private visualizationCoursesService: VisualizationCoursesService,
    private planificationCourse: PlanificationsCoursesService
  ) {}

  courses: Course[] = [];
  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.visualizationCoursesService.getviewCourses().subscribe((response: any) => {
      this.courses = response;
      this.nameCourse()
    });
  }

  public nameCourse(): void {
    this.courses.forEach(
      (solicitud) => {
        this.planificationCourse.planificationById(
          solicitud.planificationId
        ).subscribe(
          (course) => {
            solicitud.name = course.name;
          }
        )
      }
    )
  }
}
