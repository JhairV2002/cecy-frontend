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

@NgModule({
  declarations: [
    UserAdministrationComponent,
    UserAdministrationListComponent,
    UserAdministrationFormComponent,
    FormAddUserComponent,
    DashboardComponent,
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
        ChipModule
    ]
})
export class UserAdministrationModule {
}
