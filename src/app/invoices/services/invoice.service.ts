import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import {InvoicePaginationResponse} from "../models/invoice-pagination-response";

const BASE_URL = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpService: HttpClient) { }


  getInvoices(page: number, perPage: number | undefined, sortField: string | undefined, sortDir: string | undefined, filter: string): Observable<InvoicePaginationResponse> {
    let queryString:string = `${BASE_URL}/invoices?page=${page + 1}&perPage=${perPage}`;
    if(sortField && sortDir) {
      queryString = `${queryString}&sort=${sortField}&sortDir=${sortDir}`;
    }

    if(filter) {
      queryString = `${queryString}&filter=${filter}`
    }
    return this.httpService.get<InvoicePaginationResponse>(queryString);
  }

  createInvoice(bodyData: Invoice):Observable<Invoice> {
    return this.httpService.post<Invoice>(`${BASE_URL}/invoices`, bodyData);
  }


  deleteInvoice(id:string): Observable<Invoice> {
    return this.httpService.delete<Invoice>(`${BASE_URL}/invoices/${id}`);
  }

  findInvoiceById(id:string) :Observable<Invoice> {
    return this.httpService.get<Invoice>(`${BASE_URL}/invoices/${id}`);
  }


}
