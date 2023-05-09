import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from "./attendance/attendance.component";
import { ParticipantCourseComponent } from "./participant-course/participant-course.component";
import { InstructorCourseComponent } from "./instructor-course/instructor-course.component";
import { ParticipantComponent } from './participant/participant.component';
import {AttendanceFormComponent} from "./attendance/attendance-form/attendance-form.component";
import {AttendanceRecordsComponent} from "./attendance/attendance-records/attendance-records.component";
import {TemariCourseComponent} from "./temari-course/temari-course.component";

const routes: Routes = [
  {
    path: 'attendance/:id',
    component: AttendanceComponent
  },
  {
    path: 'attendance-records/:id',
    component: AttendanceRecordsComponent
  },
  {
    path: 'participant-course/:id',
    component: ParticipantCourseComponent
  },
  {
    path: 'participant-attendance/:id',
    component: AttendanceFormComponent
  },
  {
    path: 'courses',
    component: InstructorCourseComponent
  },
  {
    path: 'temari-courses/:id',
    component: TemariCourseComponent
  },
  {
    path: 'participant',
    component: ParticipantComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule {
}
