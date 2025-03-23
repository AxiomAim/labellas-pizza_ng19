import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { MenuItem } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppService } from '@services/app.service';
import { HeaderImageComponent } from '@shared/header-image/header-image.component';
import { QuantityCounterComponent } from '@shared/quantity-counter/quantity-counter.component';

@Component({
    selector: 'app-cart',
    imports: [
        HeaderImageComponent,
        FlexLayoutModule,
        MatCardModule,
        RouterLink,
        CurrencyPipe,
        QuantityCounterComponent,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  public total: any[] = [];
  public cartItemCount: any[] = [];
  public cartItemCountTotal: number = 0;
  public currentTotalCartCount: number = 0;

  constructor(public appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.updateCartTotal();
  }

  ngDoCheck() {
    if (this.currentTotalCartCount !== this.appService.Data.totalCartCount) {
      this.updateCartTotal();
      this.currentTotalCartCount = this.appService.Data.totalCartCount;
    }
  }

  public updateCartTotal() {
    this.cartItemCountTotal = 0;
    this.appService.Data.cartList.forEach(item => {
      let price = 0;
      if (item.discount) {
        price = item.price - (item.price * (item.discount / 100));
      }
      else {
        price = item.price;
      }
      this.total[item.id] = item.cartCount * price;
      this.cartItemCount[item.id] = item.cartCount;
      this.cartItemCountTotal += item.cartCount;
    });
  }

  public onQuantityChange(count: number, menuItem: MenuItem) {
    menuItem.cartCount = count;
    if (menuItem.cartCount <= menuItem.availibilityCount) {
      let price = 0;
      if (menuItem.discount) {
        price = menuItem.price - (menuItem.price * (menuItem.discount / 100));
      }
      else {
        price = menuItem.price;
      }
      this.total[menuItem.id] = count * price;
      this.cartItemCount[menuItem.id] = count;
      this.appService.calculateCartTotal();
      this.cartItemCountTotal = 0;
      this.cartItemCount.forEach(value => {
        this.cartItemCountTotal += value;
      });
      this.appService.Data.totalCartCount = this.cartItemCountTotal;
      this.appService.Data.cartList.forEach(item => {
        this.cartItemCount.forEach((value, index) => {
          if (item.id == index) {
            item.cartCount = value;
          }
        });
      });
    }
    else {
      menuItem.cartCount = menuItem.availibilityCount;
      this.snackBar.open('You can not add more items than available. In stock ' + menuItem.availibilityCount + ' items and you already added ' + menuItem.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    }

  }


  public remove(item: MenuItem) {
    const index: number = this.appService.Data.cartList.indexOf(item);
    if (index !== -1) {
      this.appService.Data.cartList.splice(index, 1);
      this.appService.calculateCartTotal();
      this.total.forEach(val => {
        if (val == this.total[item.id]) {
          this.total[item.id] = 0;
        }
      });
      this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[item.id];
      this.appService.Data.totalCartCount = this.cartItemCountTotal;
      this.cartItemCount.forEach(val => {
        if (val == this.cartItemCount[item.id]) {
          this.cartItemCount[item.id] = 0;
        }
      });
    }
  }

  public clear() {
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
  }


}
