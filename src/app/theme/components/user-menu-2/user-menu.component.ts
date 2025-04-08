import { Component, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { AppService } from '@services/app.service';
import { User } from '@services/data-service/user.model';
import { Settings, SettingsService } from '@services/settings.service';

@Component({
    selector: 'app-user-menu',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatBadgeModule,
        FlexLayoutModule,
        TranslateModule,
        RouterLink
    ],
    templateUrl: './user-menu.component.html'
})
export class UserMenuComponent {
  @Input() loginUser: User;
  public settings: Settings;
  constructor(public appService: AppService, public settingsService: SettingsService) {
    this.settings = this.settingsService.settings;
  }  
}
