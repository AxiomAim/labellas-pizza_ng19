import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface, SwiperModule, SwiperPaginationInterface } from '../../theme/components/swiper/swiper.module';
import { AppService } from '@services/app.service';

@Component({
    selector: 'app-testimonials',
    imports: [
        SwiperModule
    ],
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  public testimonials: any;
  public config: SwiperConfigInterface = {};
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.testimonials = this.appService.getTestimonials();
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true
    }
  }

}
