import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { DentistInfoComponent } from './components/cruds/dentist/dentist-info/dentist-info.component';
import { ClientInfoComponent } from './components/cruds/client/client-info/client-info.component';
import { ClinicHistoryInfoComponent } from './components/cruds/clinic-history/clinic-history-info/clinic-history-info.component';
import { ClinicHistoryListComponent } from './components/cruds/clinic-history/clinic-history-list/clinic-history-list.component';
import { ClientListComponent } from './components/cruds/client/client-list/client-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DentistRegisterComponent } from './components/register/dentist/dentist.component';
import { ClientRegisterComponent } from './components/register/client/client.component';
import { ClinicHistoryRegisterComponent } from './components/register/clinic-history/clinic-history.component';
import { OdontogramRegisterComponent } from './components/register/odontogram/odontogram.component';
import { OdontogramInfoComponent } from './components/cruds/odontogram/odontogram-info/odontogram-info.component';
import { OdontogramListComponent } from './components/cruds/odontogram/odontogram-list/odontogram-list.component';
import { DentistListComponent } from './components/cruds/dentist/dentist-list/dentist-list.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DentistInfoComponent,
    ClientInfoComponent,
    ClinicHistoryInfoComponent,
    ClinicHistoryListComponent,
    ClientListComponent,
    NotFoundComponent,
    DentistRegisterComponent,
    ClientRegisterComponent,
    ClinicHistoryRegisterComponent,
    OdontogramRegisterComponent,
    OdontogramInfoComponent,
    OdontogramListComponent,
    DentistListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule
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
              environment.Google_client
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
