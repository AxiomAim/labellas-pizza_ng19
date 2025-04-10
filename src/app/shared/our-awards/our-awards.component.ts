import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface, SwiperModule } from '../../theme/components/swiper/swiper.module';
import { AppService } from '@services/app.service';

@Component({
    selector: 'app-our-awards',
    imports: [
        SwiperModule
    ],
    templateUrl: './our-awards.component.html',
    styleUrls: ['./our-awards.component.scss']
})
export class OurAwardsComponent implements OnInit {
  public awards: any[] = [];
  public config: SwiperConfigInterface = {};

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.awards = this.appService.getAwards();
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 6,
      spaceBetween: 16,
      keyboard: true,
      navigation: false,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide",
      breakpoints: {
        280: {
          slidesPerView: 2
        },
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3
        },
        960: {
          slidesPerView: 4
        },
        1280: {
          slidesPerView: 5
        },
        1500: {
          slidesPerView: 6
        }
      }
    }
  }

}
