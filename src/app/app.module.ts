import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClinicComponent } from './clinic/clinic.component';
import { CustomerComponent } from './customer/customer.component';
import { PetComponent } from './pet/pet.component';
import { RepairComponent } from './repair/repair.component';
import { MediseenComponent } from './mediseen/mediseen.component';
import { ReportComponent } from './report/report.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {shareService} from './shareService';


const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'clinic', component: ClinicComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'pet', component: PetComponent },
  { path: 'repair', component: RepairComponent },
  { path: 'mediseen', component: MediseenComponent },
  { path: 'report', component: ReportComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    DashboardComponent,
    ClinicComponent,
    CustomerComponent,
    PetComponent,
    RepairComponent,
    MediseenComponent,
    ReportComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)],
  providers: [shareService],
  bootstrap: [AppComponent],
})
export class AppModule {}
