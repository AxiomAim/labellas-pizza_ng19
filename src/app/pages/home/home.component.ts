import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MenuItem } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppService } from '@services/app.service';
import { Settings, SettingsService } from '@services/settings.service';
import { HeaderCarouselComponent } from '@shared/header-carousel/header-carousel.component';
import { HeaderImageComponent } from '@shared/header-image/header-image.component';
import { HeaderVideoComponent } from '@shared/header-video/header-video.component';
import { MenuItemsCarouselComponent } from '@shared/menu-items-carousel/menu-items-carousel.component';
import { TodayMenuComponent } from '@shared/today-menu/today-menu.component';

@Component({
    selector: 'app-home',
    imports: [
        FlexLayoutModule,
        HeaderImageComponent,
        HeaderCarouselComponent,
        HeaderVideoComponent,
        MatCardModule,
        MenuItemsCarouselComponent,
        TodayMenuComponent,
        RouterLink,
        MatButtonModule
    ],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public slides = [];
  public specialMenuItems: Array<MenuItem> = [];
  public bestMenuItems: Array<MenuItem> = [];
  public todayMenu!: MenuItem;
  public settings: Settings;
  
  constructor(public settingsService: SettingsService, public appService: AppService) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit(): void {
    this.getSlides();
    this.getSpecialMenuItems();
    this.getBestMenuItems();
    this.getTodayMenu();
  }

  public getSlides() {
    this.appService.getHomeCarouselSlides().subscribe((res: any) => {
      this.slides = res;
    });
  }

  public getSpecialMenuItems() {
    this.appService.getSpecialMenuItems().subscribe(menuItems => {
      this.specialMenuItems = menuItems;
    });
  }

  public getBestMenuItems() {
    this.appService.getBestMenuItems().subscribe(menuItems => {
      this.bestMenuItems = menuItems;
    });
  }

  public getTodayMenu() {
    this.appService.getMenuItemById(23).subscribe(data => {
      this.todayMenu = data;
    });
  }

}
