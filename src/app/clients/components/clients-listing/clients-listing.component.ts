import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../services/client.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Client} from "../../models/client";
import {MatDialog} from '@angular/material/dialog';
import {ClientDialogFormComponent} from "../client-dialog-form/client-dialog-form.component";
import {mergeMap, filter} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";






@Component({
  selector: 'app-clients',
  templateUrl: './clients-listing.component.html',
  styleUrls: ['./clients-listing.component.scss']
})
export class ClientsListingComponent implements OnInit {

  isResultsLoading: boolean = true;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'action'];
  dataSource = new MatTableDataSource<Client>();
  successMsg: string = '';



  constructor(private clientService: ClientService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isResultsLoading = true;
    this.clientService.getClient().subscribe(data => {
      this.dataSource.data = data;
      this.isResultsLoading = false;
    })
  }


  openDialog(_id:string) {
      const options = {
        width: '100vw',
        data: {}
      }

    if(_id) {
      options.data = {clientId: _id}
    }

    const dialogRef = this.dialog.open(ClientDialogFormComponent, options);

    const dialogData = dialogRef.afterClosed().pipe(
      mergeMap((result: Client) => {
        if(_id){
          return this.clientService.updateClient(_id, result)

        } else {
          return this.clientService.createClient(result);
        }

      })
    )

      dialogData.subscribe((client) => {
        if(_id) {
          const index = this.dataSource.data.findIndex(client => client._id === _id);
          this.dataSource.data[index] = client;
          this.successMsg = 'Client Updated'
        } else {
          this.dataSource.data.push(client);
          this.successMsg = 'Client created'
        }
        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open(this.successMsg, 'Success', {
          duration: 3000
        });
      })


  }

  editBtnHandler(_id: any) {
    console.log(_id)
  }

  deleteBtnHandler(_id: string) {
    this.clientService.deleteClien(_id)
      .subscribe((data) => {
        this.dataSource.data = this.dataSource.data.filter((u) => u._id!==_id);
        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open('Client deleted', 'Success', {
          duration: 2000
        })
      })
  }

  // deleteBtnHandler(_id: string) {
  //   this.clientService.deleteClien(_id)
  //     .subscribe({
  //       next:((data )=>  this.dataSource = this.dataSource.data.filter((u) => u._id!==_id)),
  //       error: (err => console.error(err))
  //     })
  // }
}

