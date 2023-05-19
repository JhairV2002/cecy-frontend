import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAdministrationListComponent} from './user-administration-list/user-administration-list.component';
import {UserAdministrationFormComponent} from './user-administration-form/user-administration-form.component';
import {UserAdministrationComponent} from './user-administration.component';
import {UserAdministrationRoutingModule} from './user-administration-routing.module';
import {TableModule} from 'primeng/table';
import {SpeedDialModule} from 'primeng/speeddial';
import {RippleModule} from 'primeng/ripple';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {InputSwitchModule} from 'primeng/inputswitch';
import {KeyFilterModule} from 'primeng/keyfilter';
import {SharedModule} from '@shared/shared.module';
import {ToolbarModule} from 'primeng/toolbar';
import {PaginatorModule} from 'primeng/paginator';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { ChipModule } from 'primeng/chip';
import { FormAddUserComponent } from './form-add-user/form-add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChipsModule } from 'primeng/chips';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { CareersListComponent } from './careers-list/careers-list.component';
import { CareersFormComponent } from './careers-form/careers-form.component';


@NgModule({
  declarations: [
    UserAdministrationComponent,
    UserAdministrationListComponent,
    UserAdministrationFormComponent,
    FormAddUserComponent,
    DashboardComponent,
    RolesListComponent,
    RolesFormComponent,
    CareersListComponent,
    CareersFormComponent,
  ],
    imports: [
        CommonModule,
        UserAdministrationRoutingModule,
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
        ChipsModule
    ]
})
export class UserAdministrationModule {
}
