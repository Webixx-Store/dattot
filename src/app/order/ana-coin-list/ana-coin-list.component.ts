import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Toast, ToastrService } from 'ngx-toastr';
import { setShowOverlayLoading } from 'src/app/actions/overlay-loading.action';
import { OverlayLoadingState } from 'src/app/selectors/overlay-loading.selector';
import { CoinService } from 'src/app/service/coin.service';

@Component({
  selector: 'app-ana-coin-list',
  templateUrl: './ana-coin-list.component.html',
  styleUrls: ['./ana-coin-list.component.css']
})
export class AnaCoinListComponent implements OnInit {
  coins : any [] = [];
  pagedCoins : any [] = [];
  step : number = 0;
  content : any ;
  showPopup:boolean = false;
  len: number = 20;
  page = 1;

  analyzeCoin(coin: any) {
    alert(`Phân tích ${coin.name} trong khung giờ ${coin.timeFrame}`);
  }
  constructor(private coinService : CoinService ,  private overlayLoadingStore: Store<OverlayLoadingState> , private toastr: ToastrService) {

  }

  ngOnInit(): void {
    let params = {
      vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 200,
        page: this.page,
        sparkline: 'false',
    }

    this.fetchCoins(params);
  }

  fetchCoins(params: any): void {
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:true}));
    this.coinService.getCoinGecKo(params).subscribe({
      next: (data) => {
        this.coins = data;
        const startIndex = (this.page - 1) * this.len;
        const endIndex = startIndex + this.len;
        this.pagedCoins = this.coins.slice(startIndex, endIndex);
        console.log(`Current Page: ${this.page}`);
        console.log('Paged Coins:', this.pagedCoins);
        this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:false}));
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

   handlePageEvent(page:PageEvent){
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:true}));
      this.page = page.pageIndex + 1;
      this.len = page.pageSize;
      // Tính toán dữ liệu trang hiện tại
      const startIndex = (this.page - 1) * this.len;
      const endIndex = startIndex + this.len;

      // Lấy dữ liệu cho trang hiện tại
      this.pagedCoins = this.coins.slice(startIndex, endIndex);

      console.log(`Current Page: ${this.page}`);
      console.log('Paged Coins:', this.pagedCoins);
      setTimeout(() => {
        this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:false}));
      }, 300);
    }

  analyze(item : any): void {

    this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:true}));

    let symbol = String(item.symbol).toUpperCase();
    this.coinService.analyze(symbol , item.timeFrame , 200).subscribe({
      next: (data) => {
        this.step = 1;
        this.content = data;
        this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:false}));
      },
      error: (err) => {
        this.step = 0;
        this.toastr.error("Đồng tiền " + symbol + " hoặc khung thời gian này chưa được hỗ trợ trên api của Binance vui lòng chọn option khác đễ phân tích")
        this.overlayLoadingStore.dispatch(setShowOverlayLoading({loading:false}));
        console.error(err);
      }
    });
  }

  goBackToStep0(){
    this.step = 0;
  }

  clickShowPopup(){
    this.showPopup = true;
  }

  closePopup(){
    this.showPopup = false;
  }



}
