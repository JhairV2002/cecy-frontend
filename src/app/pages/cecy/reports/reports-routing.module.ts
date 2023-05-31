import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ReportAnnualProgrammingComponent } from './report-annual-programming/report-annual-programming.component';

import { ReportNeedComponent } from './report-need/report-need.component';
import { ReportParticipantRegistrationComponent } from './report-participant-registration/report-participant-registration.component';
import { ReportPhotographicRecordComponent } from './report-photographic-record/report-photographic-record.component';
import { ReportAttendenceEvaluationComponent} from './report-attendence-evaluation/report-attendence-evaluation.component';
import { ReportCurricularDesignComponent} from './report-curricular-design/report-curricular-design.component';
import { ReportCourseFinalComponent} from './report-course-final/report-course-final.component';



const routes: Routes = [
  {path: 'annualProgramming', component: ReportAnnualProgrammingComponent },
  {path: 'participantRegistration', component: ReportParticipantRegistrationComponent},
  {path: 'photographicRecord', component:  ReportPhotographicRecordComponent},
  {path: 'need', component: ReportNeedComponent },
  {path: 'attendenceEvaluation', component: ReportAttendenceEvaluationComponent },
  {path: 'participantRegistration', component: ReportCurricularDesignComponent},
  {path: 'photographicRecord', component:  ReportCourseFinalComponent},

  // {path: 'password-reset', component: PasswordResetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {
}
