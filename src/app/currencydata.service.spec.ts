import { TestBed } from '@angular/core/testing';

import { CurrencydataService } from './currencydata.service';

describe('CurrencydataService', () => {
  let service: CurrencydataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencydataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
