import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuItem } from '@models/app.models';
import { AppService } from '@services/app.service';
import { Settings, SettingsService } from '@services/settings.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { QuantityCounterComponent } from '@shared/quantity-counter/quantity-counter.component';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-cart-overview',
    imports: [
        RouterLink,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        CurrencyPipe,
        QuantityCounterComponent,
        FlexLayoutModule
    ],
    templateUrl: './cart-overview.component.html'
})
export class CartOverviewComponent implements OnInit {
  public menuItems: MenuItem[] = [];
  public settings: Settings;
  constructor(public appService: AppService,
              public settingsService: SettingsService,
              private bottomSheetRef: MatBottomSheetRef<CartOverviewComponent>,
              public snackBar: MatSnackBar) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit() {
    this.menuItems = this.appService.Data.cartList;
  }

  public hideSheet(isRedirect: boolean) {
    this.bottomSheetRef.dismiss(isRedirect);
  }

  public clearCart() {
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.hideSheet(false)
  }

  public remove(item: MenuItem, event: any) {
    const index: number = this.appService.Data.cartList.indexOf(item);
    if (index !== -1) {
      item.cartCount = 0;
      this.appService.Data.cartList.splice(index, 1);
      this.appService.calculateCartTotal();
    }
    if (this.appService.Data.cartList.length == 0) {
      this.hideSheet(false);
    }
    event.preventDefault();
  }

  public counterChange(menuItem: MenuItem, count: number) {
    menuItem.cartCount = count;
    if (menuItem.cartCount <= menuItem.availibilityCount) {
      this.appService.calculateCartTotal();
    }
    else {
      menuItem.cartCount = menuItem.availibilityCount;
      this.snackBar.open('You can not add more items than available. In stock ' + menuItem.availibilityCount + ' items and you already added ' + menuItem.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    }
  }


}
