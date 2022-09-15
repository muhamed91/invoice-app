import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {InvoiceService} from "../../services/invoice.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router, ActivatedRoute} from "@angular/router";
import {Invoice} from "../../models/invoice";
import {ClientService} from "../../../clients/services/client.service";
import {Client} from "../../../clients/models/client";


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  public invoiceForm!: FormGroup
  private invoice! : Invoice
  public clients: Client[] = [];

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService

  ) { }

  ngOnInit(): void {
    this.createFrom();
    this.getOneInvoice();
    this.setClients();

    console.log(this.router.url);
    
  }


  getOneInvoice(): void {
    const id = this.route.params.subscribe(params => {
      console.log(params);
      
      let id = params['id'];
       if(!id) {
         return;
       }
       this.invoiceService.findInvoiceById(id).subscribe(invoice => {
         this.invoice = invoice;
         this.invoiceForm.patchValue(this.invoice);

       }, error => this.errorHandler(error, 'Failed to get the invoice'))

    })
  }

  createFrom() {
    this.invoiceForm = this.fb.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      client: ['', Validators.required],
      tax: '',
      rate: '',

    })
  }




  private setClients() {
    this.clientService.getClient()
      .subscribe(clients => {
        this.clients = clients
      })
  }

  onSubmit(): void {
    const {value} = this.invoiceForm; //data from the Formfields
    this.invoiceService.createInvoice(value)
      .subscribe(data => {
        this._snackBar.open('Invoice Created', 'Success', {
          duration: 3000
        });
        this.router.navigate(['dashboard', 'invoices']);
        console.log(data)
      }, error => this.errorHandler(error, 'Failed to create Invoice'))
  }


 private errorHandler(error: string, message: string):void {
    console.error(error);
    this._snackBar.open(message, 'Error', {
      duration: 2000
    })
 }

}
