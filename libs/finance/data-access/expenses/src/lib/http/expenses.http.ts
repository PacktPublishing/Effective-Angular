import { Injectable } from '@angular/core';
import { GenericHttpService } from '@bt-libs/shared/data-access/generic-http';
import { ExpenseDto, ExpenseModel } from '../models/expenses.interfaces';
import { ExpensesModelAdapter } from '../adapters/expense.adapter';

@Injectable({
  providedIn: 'root'
})
export class ExpensesHttpService extends GenericHttpService<ExpenseDto, ExpenseModel> {

  constructor() {
    super(
      '/expenses',
      '',
      new ExpensesModelAdapter()
    );
  }

  // public createJobTitlesBulk(body: Partial<JobTitleDto>[], extraHttpRequestParams?: any): Observable<JobTitleDto[]> {
  //   return this.httpClient.post(`${this.url}/create/bulk`, body, this.prepareRequestOptions(extraHttpRequestParams)) as Observable<any>;
  // }
}
