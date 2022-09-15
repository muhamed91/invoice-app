import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {AuthModule} from "../auth/auth.module";
import {JwtService} from "./services/jwt.service";
import {HttpIntercepterService} from "./services/http-intercepter.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [AuthService, JwtService, HttpIntercepterService]
})
export class CoreModule { }
