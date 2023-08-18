import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';

// NG COMPONENTS
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SharedModule } from '@shared/shared.module';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { SkeletonModule } from 'primeng/skeleton';
import { HomeComponent } from './home/home.component';
import { CareerComponent } from './career/career.component';
import { CareerListComponent } from './career/career-list/career-list.component';
import { CareerFormComponent } from './career/career-form/career-form.component';
import { RoleComponent } from './role/role.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleFormComponent } from './role/role-form/role-form.component';
import { SearchComponent } from './user/search/search.component';
import { ChangePasswordUserComponent } from './change-password-user/change-password-user.component';

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserFormComponent,
    HomeComponent,
    CareerComponent,
    CareerListComponent,
    CareerFormComponent,
    RoleComponent,
    RoleListComponent,
    RoleFormComponent,
    SearchComponent,
    ChangePasswordUserComponent,
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule,
    TableModule,
    SpeedDialModule,
    RippleModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    ProgressBarModule,
    SplitButtonModule,
    PasswordModule,
    DividerModule,
    KeyFilterModule,
    ToolbarModule,
    PaginatorModule,
    CardModule,
    ToastModule,
    ConfirmPopupModule,
    ChipModule,
    ChipsModule,
    SkeletonModule
  ],
})
export class AdministratorModule {}
