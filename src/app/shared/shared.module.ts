import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPermissionsDirective } from '@shared/directives/roles-permissions.directive';
import { ErrorMessageDirective } from '@shared/directives/error-message.directive';
import { TokenDirective } from '@shared/directives/token.directive';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { LabelDirective } from './directives/label.directive';
import { CertificatedPipe } from './pipes/professional/academic-formation/certificated.pipe';
import { WorkedPipe } from './pipes/professional/experience/worked.pipe';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';
import { ViewFilesComponent } from '@shared/components/file/view-files/view-files.component';
import { UploadFilesComponent } from '@shared/components/file/upload-files/upload-files.component';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ExtensionsPipe } from '@shared/pipes/common/extensions.pipe';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { TermsCondititonsPipe } from '@shared/pipes/chat/terms-condititons.pipe';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { RouterModule, Routes } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SidebarModule } from 'primeng/sidebar';

import { BlankComponent } from './components/layouts/blank/blank.component';
import { BreadcrumbComponent } from './components/layouts/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { TopbarComponent } from './components/layouts/topbar/topbar.component';
import { MenubarModule } from 'primeng/menubar';
import { UserComponent } from './components/user/user.component';
import { ImageModule } from 'primeng/image';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotificationComponent } from './components/layouts/notification/notification.component';
import { RelativeTimePipe } from './pipes/date/relative-time.pipe';

const routes: Routes = [{ path: 'user/profile', component: UserComponent }];

@NgModule({
  declarations: [
    RolesPermissionsDirective,
    ErrorMessageDirective,
    TokenDirective,
    LabelDirective,
    SkeletonComponent,
    ProgressBarComponent,
    ViewFilesComponent,
    UploadFilesComponent,
    CertificatedPipe,
    WorkedPipe,
    ExtensionsPipe,
    SearchComponent,
    TermsCondititonsPipe,
    BlankComponent,
    BreadcrumbComponent,
    FooterComponent,
    SidebarComponent,
    TopbarComponent,
    UserComponent,
    WelcomeComponent,
    NotificationComponent,
    RelativeTimePipe,
  ],
  exports: [
    RolesPermissionsDirective,
    ErrorMessageDirective,
    TokenDirective,
    LabelDirective,
    SkeletonComponent,
    ProgressBarComponent,
    CertificatedPipe,
    WorkedPipe,
    ExtensionsPipe,
    UploadFilesComponent,
    ViewFilesComponent,
    SearchComponent,
    TermsCondititonsPipe,
    BlankComponent,
    BreadcrumbComponent,
    FooterComponent,
    SidebarComponent,
    TopbarComponent,
    UserComponent,
    WelcomeComponent,
    NotificationComponent,
    RelativeTimePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkeletonModule,
    TableModule,
    ProgressBarModule,
    RouterModule,
    PaginatorModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    TooltipModule,
    FileUploadModule,
    MessageModule,
    InputTextareaModule,
    DividerModule,
    CardModule,
    OverlayPanelModule,
    ChipModule,
    BadgeModule,
    MenuModule,
    BreadcrumbModule,
    MenubarModule,
    SidebarModule,
    ImageModule,
    RouterModule.forChild(routes),
  ],
})
export class SharedModule {}
