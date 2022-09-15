import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(token:string):void {
    window.localStorage.setItem('jwt_token', token)
  }

  getToken():string | null {
   return window.localStorage.getItem('jwt_token')
  }


  deftroyToken():void {
    window.localStorage.removeItem('jwt_token')
  }
}
