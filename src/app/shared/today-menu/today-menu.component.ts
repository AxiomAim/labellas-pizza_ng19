import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { MenuItem } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppService } from '@services/app.service';
import { Settings, SettingsService } from '@services/settings.service';
import { QuantityCounterComponent } from '@shared/quantity-counter/quantity-counter.component';
import { RatingComponent } from '@shared/rating/rating.component';
import { SocialIconsComponent } from '@shared/social-icons/social-icons.component';
import { PipesModule } from '../../theme/pipes/pipes.module';

@Component({
    selector: 'app-today-menu',
    imports: [
        FlexLayoutModule,
        MatCardModule,
        RatingComponent,
        QuantityCounterComponent,
        MatButtonModule,
        MatIconModule,
        SocialIconsComponent,
        CurrencyPipe,
        RouterLink,
        PipesModule
    ],
    templateUrl: './today-menu.component.html',
    styleUrls: ['./today-menu.component.scss']
})
export class TodayMenuComponent implements OnInit {
  @Input() menuItem!: MenuItem;
  public quantityCount: number = 1;
  public settings: Settings;
  
  constructor(public appService: AppService, public snackBar: MatSnackBar, public settingsService: SettingsService) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit(): void { }

  public counterChange(count: number) {
    this.quantityCount = count;
  }

  public addToCart() {
    this.menuItem.cartCount = this.quantityCount;
    if (this.menuItem.cartCount <= this.menuItem.availibilityCount) {
      const index: number = this.appService.Data.cartList.findIndex(item => item.id == this.menuItem.id);
      (index !== -1) ? this.appService.Data.cartList[index] = this.menuItem : this.appService.addToCart(this.menuItem, null);
      this.appService.calculateCartTotal();
    }
    else {
      this.menuItem.cartCount = this.menuItem.availibilityCount;
      this.snackBar.open('You can not add more items than available. In stock ' + this.menuItem.availibilityCount + ' items and you already added ' + this.menuItem.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    }
  }


  public addToFavorites() {
    this.appService.addToFavorites(this.menuItem);
  }

}
