import { TestBed } from '@angular/core/testing';

import { ExchagnerateService } from './exchagnerate.service';

describe('ExchagnerateService', () => {
  let service: ExchagnerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchagnerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});



