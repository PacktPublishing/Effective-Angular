import { TestBed } from '@angular/core/testing';

import { ExpensesStoreService } from './expenses.store';

describe('ExpensesStoreService', () => {
  let service: ExpensesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
