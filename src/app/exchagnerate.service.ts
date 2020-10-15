import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Observable } from 'rxjs';

export interface ExchangeData {
  rates: number[],
  base : string,
  date : Date;
}

export class Rate{
  currencyCode: string;
  rate: number;
  constructor(currencyCode: string, rate: number) {
    this.currencyCode = currencyCode;
    this.rate = rate;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExchagnerateService {

  exchangeData : ExchangeData;

  covertedAmount: number = 0;
  fromCurrencyRate: number;
  toCurrencyRate: number;
  rates: Rate[]= [];
 
  constructor(private httpClient: HttpClient) { }


  getExchangeRate(fromCurrency: string, toCurrency: string, amount: number) : Observable<ExchangeData> {
    let exchageApiUrl = "https://api.exchangeratesapi.io/latest?symbols=";
    exchageApiUrl = exchageApiUrl + fromCurrency + ',' + toCurrency;
    console.log("exchange url",  exchageApiUrl);
    return this.httpClient.get<ExchangeData>(exchageApiUrl);
  }


  
}
