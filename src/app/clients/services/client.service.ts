import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../models/client";


const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  getClient():Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${BASE_URL}/clients`);
  }


  createClient(body: Client):Observable<Client> {
    return  this.httpClient.post<Client>(`${BASE_URL}/clients`, body);
  }

  deleteClien(_id:string) :Observable<Client> {
    return this.httpClient.delete<Client>(`${BASE_URL}/clients/${_id}`)
  }

  getClientById(_id:string) : Observable<Client> {
    return this.httpClient.get<Client>(`${BASE_URL}/clients/${_id}`)
  }

  updateClient(_id:string, body: Client):Observable<Client> {
    return  this.httpClient.put<Client>(`${BASE_URL}/clients/${_id}`, body);
  }

}
