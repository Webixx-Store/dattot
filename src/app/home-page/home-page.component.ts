import { Component, OnInit } from '@angular/core';
import { MexcModel } from '../model/mexc.model';
import { Observable } from 'rxjs';
import { CoinState, getCoins } from '../selectors/coin.selector';
import { Store } from '@ngrx/store';
import { getListCoin } from '../actions/coin.action';
import { setShowOverlayLoading } from '../actions/overlay-loading.action';
import { OverlayLoadingState } from '../selectors/overlay-loading.selector';
import { ValidationUtil } from '../common/util/validation.util';
import { SwiperService } from '../service/swiper.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  swiperConfig = {
    loop: true, // Lặp lại các slide
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true, // Dynamic pagination bullets
    },
    slidesPerView: 1, // Hiển thị 1 slide tại một thời điểm
    effect: 'slide', // Hiệu ứng trượt
    autoplay: {
      delay: 5000, // Tự động chuyển slide sau 5 giây
      disableOnInteraction: false,
    },
    spaceBetween: 10, // Khoảng cách giữa các slide
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 }, // Điện thoại nhỏ
      480: { slidesPerView: 1, spaceBetween: 15 }, // Điện thoại lớn
      768: { slidesPerView: 1, spaceBetween: 20 }, // Tablet
      1024: { slidesPerView: 1, spaceBetween: 25 }, // Laptop nhỏ
      1440: { slidesPerView: 1, spaceBetween: 30 }, // Màn hình lớn
    },
  };
  items$ = new Observable<MexcModel []>();
  items= [] as MexcModel [];
  itemChoose : MexcModel  = {} as MexcModel;
  symbol:string = "";
  brands = [
    { img: 'assets/images/landing/slide1.jpg', alt: 'Brand 1' },
    { img: 'assets/images/landing/slide2.jpg', alt: 'Brand 2' },
    { img: 'assets/images/landing/slide3.jpg', alt: 'Brand 3' },
  ];
  constructor(private coinStore : Store<CoinState> , private _swiperService: SwiperService) {
      this.items$ = this.coinStore.select(getCoins);
    }

  ngOnInit(): void {
    setTimeout(() => {
      this._swiperService.createSwiper(
        'reviewSwiper',
        this.swiperConfig
      );
    }, 1000);


  }




}
