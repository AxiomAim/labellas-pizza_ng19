import { Component, Input, SimpleChange } from '@angular/core';
import { CartOverviewComponent } from '../cart-overview/cart-overview.component';
import { MenuItem } from '@models/app.models';
import { AppService } from '@services/app.service';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RatingComponent } from '@shared/rating/rating.component';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-menu-item',
    imports: [
        MatCardModule,
        FlexLayoutModule,
        MatChipsModule,
        RouterLink,
        MatIconModule,
        MatButtonModule,
        RatingComponent,
        PipesModule,
        CurrencyPipe
    ],
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() menuItem!: MenuItem;
  @Input() lazyLoad: boolean = false;
  @Input() viewType: string = "grid";
  @Input() viewColChanged: any;
  public column: number = 4;

  constructor(public appService: AppService) { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.viewColChanged) {
      this.getColumnCount(changes.viewColChanged.currentValue);
    }
  }

  public getColumnCount(value: number) {
    if (value == 25) {
      this.column = 4;
    }
    else if (value == 33.3) {
      this.column = 3;
    }
    else if (value == 50) {
      this.column = 2
    }
    else {
      this.column = 1;
    }
  }

  public addToCart() {
    this.appService.addToCart(this.menuItem, CartOverviewComponent);
  }

  public onCart() {
    if (this.appService.Data.cartList.find(item => item.id == this.menuItem.id)) {
      return true;
    }
    return false;
  }

  public addToFavorites() {
    this.appService.addToFavorites(this.menuItem);
  }

  public onFavorites() {
    if (this.appService.Data.favorites.find(item => item.id == this.menuItem.id)) {
      return true;
    }
    return false;
  }

}
