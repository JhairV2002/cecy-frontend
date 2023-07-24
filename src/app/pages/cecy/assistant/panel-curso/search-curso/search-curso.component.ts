import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '@models/cecy/secretary-cecy';
import { VisualizationCoursesService } from '@services/cecy/assistant';

@Component({
  selector: 'app-search-curso',
  templateUrl: './search-curso.component.html',
})
export class SearchCursoComponent implements OnInit {
  @Input() entityName: string = '';
  @Output() termEmitter = new EventEmitter<string>();
  constructor(
    private visualizationCourseService: VisualizationCoursesService
  ) {}

  cursos: Course[] = [];
  @Output() cursoIdEmitter = new EventEmitter<number>();
  @Input() id: number = 0;

  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.visualizationCourseService.getviewCourses().subscribe((respose) => {
      this.cursos = respose;
      console.log(this.cursos);
    });
  }

  public onSelect(id: string) {
    this.cursoIdEmitter.emit(parseInt(id));
    console.log('El id del curso es:' + id);
  }
  public onInput(term: string) {
    this.termEmitter.emit(term);
  }
}
