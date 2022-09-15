import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../../services/invoice.service';
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {mergeMap, switchMap, startWith, merge, Observable, map, tap, flatMap, concatAll} from "rxjs";
import {MatSort} from "@angular/material/sort";





@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['item', 'date', 'duedate', 'qty', 'rate', 'action'];
  dataSource: Invoice[] = [];
  resultsLength: number = 0;
  isResultsLoading: boolean = false

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort)  sort?: MatSort


  constructor(private invoiceService: InvoiceService, private router: Router) { }

  ngOnInit(): void {
    this.populateInvoices();
  }

  ngAfterViewInit() {
    this.populateInvoices();
    this.sort?.sortChange.subscribe(data => {
      console.log(data)
    })

  }



  private populateInvoices():void {
    this.isResultsLoading = true;
    this.invoiceService
      .getInvoices(1, 10, '', 'asc', '')
      .subscribe((data => {
        console.log(data)
        this.isResultsLoading = false;
        this.dataSource = data.docs;
        this.resultsLength = data.total;
        this.isResultsLoading =false;
        this.pagniationHandler();
      }))
  }

  pagniationHandler():void {
    // this.paginator?.page.subscribe((data) => {
    //   let {pageSize, pageIndex} = data
    //   this.invoiceService.getInvoices( ++pageIndex, pageSize,).
    //   subscribe(data => {
    //     this.dataSource = data.docs;
    //     this.resultsLength = data.total
    //   })
    // })

    const pagination = this.paginator?.page.pipe(
      mergeMap((x) => {
        this.isResultsLoading = true;
        return this.invoiceService.getInvoices(x.pageIndex, x.pageSize, this.sort?.active, this.sort?.direction, '')
      }),
    )
    pagination?.subscribe(data => {
      this.isResultsLoading = true;
      this.dataSource = data.docs;
      this.resultsLength = data.total;
      this.isResultsLoading = false;


    })


  }

  saveBtnHandler():void {
    this.router.navigate(['dashboard', 'invoices', 'new'])
  }

  deleteBtnHandler(id:string):void {
    this.invoiceService.deleteInvoice(id)
      .subscribe({
        next:(data => this.ngOnInit()),
        error: (err => console.error(err))
      })
  }

  editBtnHandler(_id: string) {
    this.router.navigate(['dashboard', 'invoices', _id])
  }

  filterText(filterValue: string):void {
    this.isResultsLoading = true;
     this.invoiceService.getInvoices( this.paginator!.pageIndex, this.paginator?.pageSize, this.sort?.active, this.sort?.direction, filterValue)
       .subscribe(data => {
        this.dataSource = data.docs;
        this.resultsLength = data.total;
        this.isResultsLoading = false;
       })
  }
}
