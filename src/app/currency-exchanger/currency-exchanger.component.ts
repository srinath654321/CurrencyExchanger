import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencydataService } from './../currencydata.service';
import { ExchagnerateService, ExchangeData } from './../exchagnerate.service';

export class Transaction {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  date: Date;

  constructor(fromCurrency: string, toCurrency: string, amount: number, convertedAmount: number, date: Date) {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.amount = amount;
    this.convertedAmount = convertedAmount;
    this.date = date;
  }
}

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.css']
})
export class CurrencyExchangerComponent implements OnInit {

  currencyConverterForm : FormGroup;
  currencies : String[] = [];
  errorText: string;

  fromCurrency : string;
  toCurrency : string;
  amount : number;
  convertedAmount: number = 0;
  rateMap = new Map<string, number>();
  currencyCodeSymbolMap = new Map<String, String>();
  isHttpError: boolean = false;
  transactions: Transaction[] = [];
 

  constructor(private fb : FormBuilder, private service: ExchagnerateService,
    private currencyDataService: CurrencydataService) { }

  ngOnInit() {
    this.currencyCodeSymbolMap = this.currencyDataService.buildCurrencyCodeSymbolMap();
    Array.from(this.currencyCodeSymbolMap.keys()).forEach(data => {
      this.currencies.push(data);
    })
    console.log(this.currencies)
    this.currencyConverterForm = this.fb.group({
      fromCurrency:['USD', [Validators.required]],
      toCurrency:['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]]
    })

    
  }

  get currencySymbol() {
    return this.currencyCodeSymbolMap.get(this.currencyConverterForm.get('fromCurrency').value)  
  }

  storeTransaction(fromCurrency: string, toCurrency: string, amount: number, convertedAmount: number) {
    let transaction = new Transaction(fromCurrency, toCurrency, amount, convertedAmount, new Date());
    this.transactions.push(transaction);
  }


  removeCard(i: number) {
    let transaction = this.transactions[i];
    this.transactions = this.transactions.filter(trans => trans != transaction);
  }

  calculate() {
    this.isHttpError = false;
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
      this.storeTransaction(this.fromCurrency, this.toCurrency, this.amount, this.convertedAmount);
    },
    (error : HttpErrorResponse) => {
      this.isHttpError = true;
      console.log("Error in executing the request ", error)
      this.errorText = error.message;
    })
  }

}
