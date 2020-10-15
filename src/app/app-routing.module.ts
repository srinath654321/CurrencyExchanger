import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyExchangerComponent } from './currency-exchanger/currency-exchanger.component';

const routes: Routes = [
  {
    path: '',
    component: CurrencyExchangerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
