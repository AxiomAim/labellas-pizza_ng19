import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Reservation } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DialogHeaderControlsComponent } from '@shared/dialog-header-controls/dialog-header-controls.component';

@Component({
    selector: 'app-details-dialog',
    imports: [
        MatDialogModule,
        DialogHeaderControlsComponent,
        FlexLayoutModule,
        MatIconModule
    ],
    templateUrl: './details-dialog.component.html',
    styleUrl: './details-dialog.component.scss'
})
export class DetailsDialogComponent {
  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public reservation: Reservation) { }
}
