import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPermissionsDirective } from '@shared/directives/roles-permissions.directive';
import { ErrorMessageDirective } from '@shared/directives/error-message.directive';
import { TokenDirective } from '@shared/directives/token.directive';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { LabelDirective } from './directives/label.directive';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';
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
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { RouterModule, Routes } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { InplaceModule } from 'primeng/inplace';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TimelineModule } from 'primeng/timeline';
import { PasswordModule } from 'primeng/password';

import { FooterComponent } from './components/layouts/footer/footer.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { TopbarComponent } from './components/layouts/topbar/topbar.component';
import { MenubarModule } from 'primeng/menubar';
import { UserComponent } from './components/user/user.component';
import { ImageModule } from 'primeng/image';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RelativeTimePipe } from './pipes/date/relative-time.pipe';
import { DropdownComponent } from './components/layouts/topbar/dropdown/dropdown.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { NotificationComponent } from './components/layouts/topbar/notification/notification.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';

const routes: Routes = [{ path: 'user/profile', component: UserComponent }];

@NgModule({
  declarations: [
    RolesPermissionsDirective,
    ErrorMessageDirective,
    TokenDirective,
    LabelDirective,
    SkeletonComponent,
    ProgressBarComponent,
    UploadFilesComponent,
    ExtensionsPipe,
    SearchComponent,
    FooterComponent,
    SidebarComponent,
    TopbarComponent,
    UserComponent,
    WelcomeComponent,
    RelativeTimePipe,
    DropdownComponent,
    ProfileComponent,
    NotificationComponent,
    ChangePasswordComponent,
  ],
  exports: [
    RolesPermissionsDirective,
    ErrorMessageDirective,
    TokenDirective,
    LabelDirective,
    SkeletonComponent,
    ProgressBarComponent,
    ExtensionsPipe,
    UploadFilesComponent,
    FooterComponent,
    SidebarComponent,
    TopbarComponent,
    UserComponent,
    WelcomeComponent,
    RelativeTimePipe,
    DropdownComponent,
    ProfileComponent,
    ChangePasswordComponent,
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
    AvatarModule,
    DialogModule,
    InplaceModule,
    ConfirmPopupModule,
    ToastModule,
    ProgressSpinnerModule,
    PanelMenuModule,
    TimelineModule,
    PasswordModule,
  ],
})
export class SharedModule { }
