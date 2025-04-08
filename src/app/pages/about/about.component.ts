import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Settings, SettingsService } from '@services/settings.service';
import { HeaderImageComponent } from '@shared/header-image/header-image.component';

@Component({
    selector: 'app-about',
    imports: [
        HeaderImageComponent,
        MatCardModule,
        FlexLayoutModule,
        MatChipsModule,
        MatIconModule,
    ],
    templateUrl: './about.component.html'
})
export class AboutComponent {
  public workingHours = [
    { day: "Monday", hours: "10AM TO 11PM" },
    { day: "Tuesday", hours: "10AM TO 11PM" },
    { day: "Wednesday", hours: "10AM TO 11PM" },
    { day: "Thursday", hours: "10AM TO 11PM" },
    { day: "Friday", hours: "10AM TO 11PM" },
    { day: "Saturday", hours: "10AM TO 11PM" },
    { day: "Sunday", hours: "10AM TO 11PM" }
  ]

  public settings: Settings;
  constructor(public settingsService: SettingsService) {
    this.settings = this.settingsService.settings;
  }
}
