import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService implements HttpInterceptor{

  constructor(private jwtService: JwtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig: Object | any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    debugger;
    const token = this.jwtService.getToken();
    if(token) {
      headersConfig['Authorization'] = `bearer ${token}`
    }

    const _req = req.clone({setHeaders: headersConfig});
    return next.handle(_req)
  }
}
