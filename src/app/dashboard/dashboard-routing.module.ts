import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoiceListingComponent } from '../invoices/components/invoice-listing/invoice-listing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {InvoiceFormComponent} from "../invoices/components/invoice-form/invoice-form.component";
import {ClientsListingComponent} from "../clients/components/clients-listing/clients-listing.component";


const routes: Routes = [
  {path: '', component: DashboardComponent,
    children: [
      {path: 'invoices', component: InvoiceListingComponent},
      {path: 'invoices/new', component: InvoiceFormComponent},
      {path: 'invoices/:id', component: InvoiceFormComponent},
      {path:'clients', component: ClientsListingComponent},
      {path: '**', redirectTo: 'invoices'}
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
