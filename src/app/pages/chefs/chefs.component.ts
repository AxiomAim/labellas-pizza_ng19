import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MenuItem } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppService } from '@services/app.service';
import { HeaderImageComponent } from '@shared/header-image/header-image.component';
import { MenuItemsCarouselComponent } from '@shared/menu-items-carousel/menu-items-carousel.component';
import { RatingComponent } from '@shared/rating/rating.component';

@Component({
    selector: 'app-chefs',
    imports: [
        HeaderImageComponent,
        FlexLayoutModule,
        RouterLink,
        MatCardModule,
        RatingComponent,
        MatIconModule,
        MatButtonModule,
        MenuItemsCarouselComponent
    ],
    templateUrl: './chefs.component.html'
})
export class ChefsComponent implements OnInit {
  public chefs: any;
  public menuItems: MenuItem[] = [];

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.chefs = this.appService.getChefs();
    this.getMenuItems();
  }

  public getMenuItems() {
    this.appService.getMenuItems().subscribe(data => {
      this.menuItems = this.appService.shuffleArray(data).slice(0, 8);
    });
  }

}
