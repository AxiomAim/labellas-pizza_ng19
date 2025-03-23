import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppService } from '@services/app.service';
import { Settings, SettingsService } from '@services/settings.service';
import { QuantityCounterComponent } from '@shared/quantity-counter/quantity-counter.component';
import { RatingComponent } from '@shared/rating/rating.component';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { MatTabsModule } from '@angular/material/tabs';
import { CommentsComponent } from '@shared/comments/comments.component';
import { MenuItemsCarouselComponent } from '@shared/menu-items-carousel/menu-items-carousel.component';
import { GetInTouchComponent } from '@shared/get-in-touch/get-in-touch.component';

@Component({
    selector: 'app-menu-single',
    imports: [
        MatCardModule,
        MatChipsModule,
        FlexLayoutModule,
        RatingComponent,
        CurrencyPipe,
        QuantityCounterComponent,
        MatIconModule,
        MatButtonModule,
        PipesModule,
        MatTabsModule,
        CommentsComponent,
        MenuItemsCarouselComponent,
        GetInTouchComponent
    ],
    templateUrl: './menu-single.component.html'
})
export class MenuSingleComponent implements OnInit {
  private sub: any;
  public menuItem!: MenuItem;
  public settings: Settings;
  public quantityCount: number = 1;
  public relatedMenuItems: Array<MenuItem> = [];

  constructor(public settingsService: SettingsService,
              public appService: AppService,
              private activatedRoute: ActivatedRoute,
              public fb: FormBuilder,
              public snackBar: MatSnackBar) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getMenuItemById(params['id']);
    });
    this.getRelatedMenuItems();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getMenuItemById(id: number) {
    const index: number = this.appService.Data.cartList.findIndex(item => item.id == id);
    if (index !== -1) {
      this.menuItem = this.appService.Data.cartList[index];
      this.quantityCount = this.menuItem.cartCount;
    }
    else {
      this.appService.getMenuItemById(id).subscribe(data => {
        this.menuItem = data;
      });
    }
  }

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

  public getRelatedMenuItems() {
    this.appService.getMenuItems().subscribe(data => {
      this.relatedMenuItems = this.appService.shuffleArray(data).slice(0, 8);
    });
  }

}
