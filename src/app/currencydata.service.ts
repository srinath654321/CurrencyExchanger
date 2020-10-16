import { Injectable } from '@angular/core';
import { plainToClass, deserialize } from 'class-transformer';
import currencyData from './../assets/data.json'

export class CurrencyCode {
  currencyCode: string;
  countryName: string;
  currencySymbol: string;
}





@Injectable({
  providedIn: 'root'
})
export class CurrencydataService {

  currencyCodes : CurrencyCode[] = currencyData.CurrencyCodes;
  currencyCodeSymbolMap = new Map<String, String>();

  constructor() { }

  buildCurrencyCodeSymbolMap() : Map<String, String> {
    this.currencyCodes.forEach(currencydata => {
      this.currencyCodeSymbolMap.set(currencydata.currencyCode, currencydata.currencySymbol);
    })

    return this.currencyCodeSymbolMap;
  }
}
