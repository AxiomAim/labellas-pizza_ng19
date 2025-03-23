import { Component, Input, OnInit } from '@angular/core';
import { CartOverviewComponent } from '../cart-overview/cart-overview.component';
import { MenuItem } from '@models/app.models';
import { AppService } from '@services/app.service';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-menu-item-hoverable',
    imports: [
        RouterLink,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        CurrencyPipe
    ],
    templateUrl: './menu-item-hoverable.component.html',
    styleUrls: ['./menu-item-hoverable.component.scss']
})
export class MenuItemHoverableComponent implements OnInit {
  @Input() menuItem!: MenuItem;
  @Input() onlyImage: boolean = false;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
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
