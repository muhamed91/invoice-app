import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {ClientsListingComponent} from "./components/clients-listing/clients-listing.component";
import {ClientService} from "./services/client.service";
import { ClientDialogFormComponent } from './components/client-dialog-form/client-dialog-form.component';





@NgModule({
  declarations: [
    ClientsListingComponent,
    ClientDialogFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [ClientService]
})
export class ClientsModule { }
