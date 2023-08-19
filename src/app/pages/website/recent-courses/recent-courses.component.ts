import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private courseService: CursosService, private router: Router) { }
  ngOnInit(): void {
    this.loadRecentCourses();
  }

  loadRecentCourses() {
    const cachedCourseIds = localStorage.getItem('recentCourseIds');
    if (cachedCourseIds) {
      const courseIds = JSON.parse(cachedCourseIds);
      this.coursesByIds(courseIds);
    } else {
      this.recentCourses();
    }
  }


  recentCourses() {
    this.courseService.getAllCoursesByStateApprove().subscribe({
      next: (courses) => {
        console.log(courses);
        courses.sort((a: any, b: any) => b.created_at - a.created_at);
        this.recent = courses.slice(0, 6);
        const courseIds = this.recent.map(course => course.id);
        localStorage.setItem('recentCourseIds', JSON.stringify(courseIds));
      },
      error: (error) => {
        console.error(error)
      },
    });
  }

  viewCourse(id: number) {
    this.router.navigate([`course/view/${id}`])
  }

  coursesByIds(courseIds: number[]) {
    this.courseService.getCoursesByIds(courseIds).subscribe({
      next: (courses) => {
        console.log('IDS RESPUESTA COURSES', courses)
        this.recent = courses;
      },
      error: (error) => { },
    });
  }
}
