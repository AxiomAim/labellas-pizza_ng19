import { Component, Input } from '@angular/core';
import { MenuItem } from '@models/app.models';
import { SwiperConfigInterface, SwiperModule } from '../../theme/components/swiper/swiper.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemComponent } from '@shared/menu-item/menu-item.component';

@Component({
    selector: 'app-menu-items-carousel',
    imports: [
        SwiperModule,
        MatButtonModule,
        MatIconModule,
        MenuItemComponent
    ],
    templateUrl: './menu-items-carousel.component.html'
})
export class MenuItemsCarouselComponent {
  @Input('menuItems') menuItems: Array<MenuItem> = [];
  public config: SwiperConfigInterface = {}; 

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: { nextEl: '.prop-next', prevEl: '.prop-prev' },
      pagination: true,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true, 
      breakpoints: {
        280: {
          slidesPerView: 1
        },
        600: {
          slidesPerView: 2
        },
        960: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        }
      }
    }
  }

}
