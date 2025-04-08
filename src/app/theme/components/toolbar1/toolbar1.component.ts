import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '@services/app.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartOverviewComponent } from '@shared/cart-overview/cart-overview.component';
import { ReservationDialogComponent } from '@shared/reservation-dialog/reservation-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { HorizontalMenuComponent } from '../menu/horizontal-menu/horizontal-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { LogoComponent } from '@shared/logo/logo.component';
import { LangComponent } from '@shared/lang/lang.component';
import { SocialIconsComponent } from '@shared/social-icons/social-icons.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { RouterLink } from '@angular/router';
import { User } from '@services/data-service/user.model';

@Component({
    selector: 'app-toolbar1',
    imports: [
        MatToolbarModule,
        MatBadgeModule,
        MatTooltipModule,
        MatButtonModule,
        TranslateModule,
        MatIconModule,
        HorizontalMenuComponent,
        // UserMenuComponent,
        LogoComponent,
        // LangComponent,
        SocialIconsComponent,
        ContactsComponent,
        FlexLayoutModule,
        RouterLink
    ],
    templateUrl: './toolbar1.component.html'
})
export class Toolbar1Component {
  @Input() loginUser: User;
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(public appService: AppService) { }

  public sidenavToggle() {
    this.onMenuIconClick.emit();
  }
  public openCart() {
    this.appService.openCart(CartOverviewComponent)
  }
  public reservation() {
    this.appService.makeReservation(ReservationDialogComponent, null, true);
  }
}