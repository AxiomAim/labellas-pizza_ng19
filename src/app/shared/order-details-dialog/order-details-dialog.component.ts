import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog'; 
import { RouterLink } from '@angular/router';
import { Order } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DialogHeaderControlsComponent } from '@shared/dialog-header-controls/dialog-header-controls.component';

@Component({
    selector: 'app-order-details-dialog',
    imports: [
        RouterLink,
        DialogHeaderControlsComponent,
        MatDialogContent,
        FlexLayoutModule,
        CurrencyPipe
    ],
    templateUrl: './order-details-dialog.component.html'
})
export class OrderDetailsDialogComponent implements OnInit {
  public deliveryAddress = {
    'firstName': 'Emilio',
    'lastName': 'Verdines',
    'middleName': '', 
    'company': '',
    'email': 'emilio.verdines@gmail.com',
    'phone': '(+1) 770 973 0052', 
    'country': 'US',
    'city': 'New York',
    'place': 'Brooklyn',
    'postalCode': '11213',
    'address': '1568 Atlantic Ave',
    'id': 1
  }

  constructor(public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public order: Order) { }
 

  ngOnInit(): void {
  }

}
