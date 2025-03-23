import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DialogHeaderControlsComponent } from '@shared/dialog-header-controls/dialog-header-controls.component';
import { ReservationFormComponent } from '@shared/reservation-form/reservation-form.component';

@Component({
    selector: 'app-reservation-dialog',
    imports: [
        FlexLayoutModule,
        DialogHeaderControlsComponent,
        MatDialogContent,
        ReservationFormComponent
    ],
    templateUrl: './reservation-dialog.component.html'
})
export class ReservationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ReservationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
    
  public onMakeReservation(event: any) {
    console.log('event: ', event);
    this.dialogRef.close(event.value);
  }
}
