import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorProviders } from './interceptors';
import { HttpClientModule } from '@angular/common/http';

// PrimeNg Modules
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// Components
import { AppComponent } from './app.component';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
// import { ShowForRolesDirective } from './directives/show-for-roles.directive';

//Socket.io
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '@env/environment';
const config: SocketIoConfig = {
  url: environment.HOST2,
  options: { transports: ['websocket'] },
};

//Ngx Progress Bar
import { NgProgressModule } from 'ngx-progressbar';
import { InputNumberModule } from 'primeng/inputnumber';

//Google
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, GoogleSigninButtonModule, GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    //ShowForRolesDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    AvatarModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    DropdownModule,
    InputSwitchModule,
    InputTextModule,
    TableModule,
    SidebarModule,
    RippleModule,
    MenubarModule,
    PanelMenuModule,
    SharedModule,
    BreadcrumbModule,
    ProgressSpinnerModule,
    MenuModule,
    LayoutModule,
    NgProgressModule,
    SocketIoModule.forRoot(config),
    ConfirmDialogModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '714641393478-op88a1dqfqn86q823t9lpflliuj8nfi6.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    MessageService, ConfirmationService, HttpInterceptorProviders,],
  bootstrap: [AppComponent],
  exports: [
    //ShowForRolesDirective
  ],
})
export class AppModule { }
