import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ClientService} from "../../services/client.service";



@Component({
  selector: 'app-client-dialog-form',
  templateUrl: './client-dialog-form.component.html',
  styleUrls: ['./client-dialog-form.component.scss']
})
export class ClientDialogFormComponent implements OnInit {

  clientForm!: FormGroup
  public title: string = 'New Client';

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ClientDialogFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private clientService: ClientService) { }

  ngOnInit(): void {
    this.initClientForm();
    if(this.data && this.data.clientId) {
      this.setClientToForm(this.data.clientId)
    }
  }


  private initClientForm():void {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {

  }

  onNoclick():void {
    this.dialogRef.close();
  }

  private setClientToForm(clientId: string) {
    this.title = 'Edit Client'
    this.clientService.getClientById(clientId)
      .subscribe((client) => {
        this.clientForm.patchValue(client)
      })
  }
}
