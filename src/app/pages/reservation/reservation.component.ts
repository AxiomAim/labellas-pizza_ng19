import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppService } from '@services/app.service';
import { GetAppComponent } from '@shared/get-app/get-app.component';
import { HeaderImageComponent } from '@shared/header-image/header-image.component';
import { ReservationFormComponent } from '@shared/reservation-form/reservation-form.component';

@Component({
    selector: 'app-reservation',
    imports: [
        HeaderImageComponent,
        MatCardModule,
        ReservationFormComponent,
        GetAppComponent
    ],
    templateUrl: './reservation.component.html'
})
export class ReservationComponent {
  constructor(public appService: AppService) { } 

  public onMakeReservation(event: any) {
    this.appService.makeReservation(null, event.value, false);
  }
}
