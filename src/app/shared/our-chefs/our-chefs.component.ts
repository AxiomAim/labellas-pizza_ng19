import { Component, OnInit } from '@angular/core'; 
import { SwiperConfigInterface, SwiperModule } from '../../theme/components/swiper/swiper.module';
import { AppService } from '@services/app.service';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatCardModule } from '@angular/material/card';
import { RatingComponent } from '@shared/rating/rating.component';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-our-chefs',
    imports: [
        SwiperModule,
        FlexLayoutModule,
        MatCardModule,
        RatingComponent,
        MatDividerModule,
        RouterLink,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './our-chefs.component.html'
})
export class OurChefsComponent implements OnInit {
  public chefs: any[] = [];
  public config: SwiperConfigInterface = {};

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.chefs = this.appService.getChefs();
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
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
