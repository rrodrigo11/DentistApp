import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientInfoComponent } from './components/cruds/client/client-info/client-info.component';
import { ClientListComponent } from './components/cruds/client/client-list/client-list.component';
import { ClinicHistoryInfoComponent } from './components/cruds/clinic-history/clinic-history-info/clinic-history-info.component';
import { ClinicHistoryListComponent } from './components/cruds/clinic-history/clinic-history-list/clinic-history-list.component';
import { DentistInfoComponent } from './components/cruds/dentist/dentist-info/dentist-info.component';
import { DentistListComponent } from './components/cruds/dentist/dentist-list/dentist-list.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClientRegisterComponent } from './components/register/client/client.component';
import { DentistRegisterComponent } from './components/register/dentist/dentist.component';
import { ClinicHistoryRegisterComponent } from './components/register/clinic-history/clinic-history.component';
import { OdontogramInfoComponent } from './components/cruds/odontogram/odontogram-info/odontogram-info.component';
import { OdontogramListComponent } from './components/cruds/odontogram/odontogram-list/odontogram-list.component';
import { OdontogramRegisterComponent } from './components/register/odontogram/odontogram.component';


const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LogInComponent},
  {path : 'dentist' , children:
    [
      {path: '' , component: DentistInfoComponent},
      {path : 'list' , component: DentistListComponent},
      {path : 'register' , component: DentistRegisterComponent}

    ]
  },
  {path : 'client' , children:
    [
      {path : 'list/:email' , component: ClientListComponent},
      {path: '' , component: ClientInfoComponent},
      {path : 'register' , component: ClientRegisterComponent}

    ]
  },
  {path : 'clinic' , children:
    [
      {path : 'list' , component: ClinicHistoryListComponent},
      {path: '' , component: ClinicHistoryInfoComponent},
      {path : 'register' , component: ClinicHistoryRegisterComponent}
    ]
  },
  {path : 'odontogram' , children:
    [
      {path: '' , component: OdontogramInfoComponent},
      {path : 'list' , component: OdontogramListComponent},
      {path : 'register' , component: OdontogramRegisterComponent}

    ]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
