import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from } from 'rxjs';
import {ExchagnerateService, ExchangeData} from './../exchagnerate.service';

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.css']
})
export class CurrencyExchangerComponent implements OnInit {

  currencyConverterForm : FormGroup;
  currencies : string[];

  fromCurrency : string;
  toCurrency : string;
  amount : number;
  convertedAmount: number;
  rateMap = new Map<string, number>();

  constructor(private fb : FormBuilder, private service: ExchagnerateService) { }

  ngOnInit() {
    this.currencies = ['USD', 'INR', 'ABD', 'DUB', 'FBP']
    this.currencyConverterForm = this.fb.group({
      fromCurrency:['USD', [Validators.required]],
      toCurrency:['', [Validators.required]],
      amount: ['', [Validators.required]]
    })

  }

  calculate() {
    this.fromCurrency = this.currencyConverterForm.get('fromCurrency').value;
    this.toCurrency = this.currencyConverterForm.get('toCurrency').value;
    this.amount = this.currencyConverterForm.get('amount').value;
    console.log(this.fromCurrency);
    console.log(this.toCurrency);
    console.log(this.amount);
    console.log("from currency ", this.currencyConverterForm.get('fromCurrency').value)
    this.service.getExchangeRate(this.fromCurrency, this.toCurrency, this.amount)
    .subscribe((data: ExchangeData) => {
      console.log(data.rates)
      for (var key in data.rates) {
        if (data.rates.hasOwnProperty(key)) {
          this.rateMap.set(key, data.rates[key])
        }
      }
      console.log(this.rateMap)
      console.log("from currency rate" , this.rateMap.get(this.fromCurrency))
      console.log("to currency rate", this.rateMap.get(this.toCurrency))
      this.convertedAmount = (this.amount * this.rateMap.get(this.toCurrency))/this.rateMap.get(this.fromCurrency);
      console.log(this.convertedAmount)
    })
  }

}
