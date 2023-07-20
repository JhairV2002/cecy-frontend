import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { ParticipantComponent } from './participant/participant.component';
import { AttendanceRecordsComponent } from './attendance/attendance-records/attendance-records.component';
import { TemariCourseComponent } from './temari-course/temari-course.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from '@shared/components/user/change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'attendance/:id', component: AttendanceComponent },
  { path: 'attendance-records/:id', component: AttendanceRecordsComponent },
  { path: 'temari-courses/:id', component: TemariCourseComponent },
  { path: 'participant', component: ParticipantComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
