import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../../environments/environment";
import {LoginResponse, SignupRsp} from "../models/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(body: User): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.api_url}/user/login`, body)
  }


  signup(body: User): Observable<SignupRsp> {
    return this.httpClient.post<SignupRsp>(`${environment.api_url}/user/signup`, body)
  }
}
