import { TestBed } from '@angular/core/testing';

import { ExpensesFacade } from './expenses.facade';

describe('ExpensesFacadeService', () => {
  let service: ExpensesFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
