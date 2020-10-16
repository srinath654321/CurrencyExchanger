import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Type } from 'class-transformer';

export class ExchangeData {
 
  rates: number[];
  base : string;
  date : Date;
}


@Injectable({
  providedIn: 'root'
})
export class ExchagnerateService {

  exchangeData : ExchangeData;

  covertedAmount: number = 0;
  fromCurrencyRate: number;
  toCurrencyRate: number;
 
  constructor(private httpClient: HttpClient) { }


  getExchangeRate(fromCurrency: string, toCurrency: string, amount: number) : Observable<ExchangeData> {
    let exchageApiUrl = "https://api.exchangeratesapi.io/latest?symbols=";
    exchageApiUrl = exchageApiUrl + fromCurrency + ',' + toCurrency;
    console.log("exchange url",  exchageApiUrl);
    return this.httpClient.get<ExchangeData>(exchageApiUrl);
  }


  
}
