import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../shared/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicesModule } from '../invoices/invoices.module';
import { ClientsModule } from '../clients/clients.module';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpIntercepterService} from "../core/services/http-intercepter.service";



@NgModule({
  declarations: [
    DashboardComponent,
    MainContentComponent,
    SideNavComponent,
    ToolbarComponent,


  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InvoicesModule,
    MaterialModule,
    ClientsModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,useClass: HttpIntercepterService, multi: true
  }]
})
export class DashboardModule { }
