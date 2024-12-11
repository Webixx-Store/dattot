import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDetail } from '../common/util/auth-detail';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AccountInfoModel } from '../model/account-info.model';
import { ResultModel } from '../model/result.model';
import { MexcModel } from '../model/mexc.model';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
  private apiUrl1 = 'https://python-fk3x.onrender.com/analyze1'

  constructor(private _http: HttpClient) {


  }

  getAccountInfo() : Observable<AccountInfoModel[]>{
    const header :  HttpHeaders  = AuthDetail.getHeaderJwt();
    return this._http.post<AccountInfoModel[]>(environment.apiUrl + '/api/coin/myAccount', null, {
      headers:header
    });
  }

  getTestConnect() : Observable<ResultModel>{
    const header :  HttpHeaders  = AuthDetail.getHeaderJwt();
    return this._http.get<ResultModel>(environment.apiUrl + '/api/coin/testConnect', {
      headers:header
    });
  }

  addKey( params:any) : Observable<ResultModel>{
    const header :  HttpHeaders  = AuthDetail.getHeaderJwt();
    return this._http.post<ResultModel>(environment.apiUrl + '/api/coin/addKey', params, {
      headers:header
    });
  }

  getListCoin(symbol :string) : Observable<MexcModel[]>{
    const header :  HttpHeaders  = AuthDetail.getHeaderJwt();
    return this._http.get<MexcModel[]>(`${environment.apiUrl}/api/coin/get24h/${symbol}`);
  }

  getCoinGecKo(params : any): Observable<any> {
    // const params = {
    //   vs_currency: 'usd',
    //   order: 'market_cap_desc',
    //   per_page: '100',
    //   page: '1',
    //   sparkline: 'false',
    // };
    return this._http.get<any>(this.apiUrl, { params });
  }

  analyze(symbol: string = 'BTCUSDT', interval: string = '1h', limit: number = 100): Observable<any> {
    let params = new HttpParams()
      .set('symbol', symbol + 'USDT')
      .set('interval', interval)
      .set('limit', limit.toString());
  
    return this._http.get(this.apiUrl1, { 
      params, 
      responseType: 'text'  // Thêm responseType: 'text' ở đây
    });
  }
  
}
