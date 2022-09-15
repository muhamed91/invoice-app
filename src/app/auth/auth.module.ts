import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import {MaterialModule} from "../shared/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../core/services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";




@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
})
export class AuthModule { }
