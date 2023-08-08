import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { RecentCoursesComponent } from './recent-courses/recent-courses.component';
import { CoursesComponent } from './courses/courses.component';
import { AboutComponent } from './about/about.component';

//PrimeNg
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
  ],
})
export class WebsiteModule {}
