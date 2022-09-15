import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './components/invoice-listing/invoice-listing.component';
import { MaterialModule } from '../shared/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InvoiceService } from './services/invoice.service';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import {HttpIntercepterService} from "../core/services/http-intercepter.service";
InvoiceListingComponent



@NgModule({
  declarations: [
    InvoiceListingComponent,
    InvoiceFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    InvoiceListingComponent
  ],
  providers: [
    InvoiceService,
    HttpIntercepterService
  ]
})
export class InvoicesModule { }
