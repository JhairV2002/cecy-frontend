import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WebsiteComponent } from '@layout/website/website.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoursesCareerComponent } from './courses-career/courses-career.component';
import { FinalRegisterComponent } from './final-register/final-register.component';
import { CursoDetailsComponent } from '../estudiante/curso-details/curso-details.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/career/:idCareer', component: CoursesCareerComponent },
      { path: 'careers', component: CoursesComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'final-register', component: FinalRegisterComponent },
      { path: 'course/view/:id', component: CursoDetailsComponent }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule { }
