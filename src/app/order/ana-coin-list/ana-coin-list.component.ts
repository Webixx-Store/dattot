import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
  step : number = 0;
  content : any ;
  showPopup:boolean = false;

  analyzeCoin(coin: any) {
    alert(`Phân tích ${coin.name} trong khung giờ ${coin.timeFrame}`);
  }
  constructor(private coinService : CoinService ,  private overlayLoadingStore: Store<OverlayLoadingState>) {

  }

  ngOnInit(): void {
    let params = {
      vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: '20',
        page: '1',
        sparkline: 'false',
    }

    this.fetchCoins(params);
  }

  fetchCoins(params: any): void {
    this.coinService.getCoinGecKo(params).subscribe({
      next: (data) => {
        this.coins = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
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
