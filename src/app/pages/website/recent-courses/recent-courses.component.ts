import { Component, OnInit } from '@angular/core';
import { Curso } from '@models/cecy';
import { CursosService } from '@services/cecy/cursos';

@Component({
  selector: 'app-recent-courses',
  templateUrl: './recent-courses.component.html',
  styleUrls: ['./recent-courses.component.css'],
})
export class RecentCoursesComponent implements OnInit {
  recent: any[] = [];
  loading$ = this.courseService.loading$;
  constructor(private courseService: CursosService) {}
  ngOnInit(): void {
    this.getRecentCourses();
  }

  getRecentCourses() {
    return this.courseService.getAllCoursesByStateApprove().subscribe({
      next: (courses) => {
        console.log(courses);
        this.recent = courses.slice(0, 6);
      },
      error: (error) => {},
    });
  }
}
