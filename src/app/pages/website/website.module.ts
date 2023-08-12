import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { RecentCoursesComponent } from './recent-courses/recent-courses.component';
import { CoursesComponent } from './courses/courses.component';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '@shared/shared.module';


//PrimeNg
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoursesCareerComponent } from './courses-career/courses-career.component';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { FinalRegisterComponent } from './final-register/final-register.component';



@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    RecentCoursesComponent,
    AboutComponent,
    CoursesComponent,
    LoginComponent,
    RegisterComponent,
    CoursesCareerComponent,
    FinalRegisterComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ButtonModule,
    TagModule,
    ToolbarModule,
    PanelMenuModule,
    DividerModule,
    PaginatorModule,
    InputTextModule,
    CheckboxModule,
    PasswordModule,
    CardModule,
    SharedModule,
    GoogleSigninButtonModule
  ],
})
export class WebsiteModule { }
