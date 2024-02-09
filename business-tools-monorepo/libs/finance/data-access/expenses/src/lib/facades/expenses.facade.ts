import { Injectable, computed, inject } from '@angular/core';
import { ExpenseModel, ExpensesViewModel } from '../models/expenses.interfaces';
import { of, switchMap } from 'rxjs';
import { IExpensesFacade } from './expensesFacade.interface';
import { Store } from '@ngrx/store';
import { ExpenseActions, ExpenseSelectors } from '../state/expenses';
import { toSignal } from '@angular/core/rxjs-interop';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class ExpensesFacade implements IExpensesFacade {
  protected readonly store = inject(Store);
  private readonly actions = inject(Actions);

  expensesSignal = toSignal(this.store.select(ExpenseSelectors.selectExpenses), { initialValue: [] });
  inclVat = toSignal(this.store.select(ExpenseSelectors.selectInclVat), { initialValue: false });
  expenses = computed<ExpensesViewModel>(() => {
    const inclVat = this.inclVat();
    return {
      expenses: this.expensesSignal().map(expense => this.mapExpense(expense, inclVat)),
      inclVat,
      total: this.expensesSignal().reduce((acc, expense) => {
        return acc + (inclVat ? (expense.amount.value * (1 + expense.amount.vatPercentage / 100)) : expense.amount.value);
      }, 0),
    }
  });
  selectedExpense = toSignal(this.store.select(ExpenseSelectors.selectSelectedExpense), { initialValue: null });

  getExpenseSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(ExpenseActions.getExpenseSuccess.type),
      switchMap(({ expense }) => of(expense))
    )
  );

  expenseSelector$ = this.getExpenseSuccess$;

  addExpense(expense: ExpenseModel) {
    this.store.dispatch(ExpenseActions.addExpense({ expense }));
  }

  adjustVat() {
    this.store.dispatch(ExpenseActions.adjustVat());
  }

  clearExpenseSelection() {
    this.store.dispatch(ExpenseActions.clearExpenseSelection());
  }

  deleteExpense(id: number) {
    this.store.dispatch(ExpenseActions.deleteExpense({ id }));
  }

  getExpense(id: number) {
    this.store.dispatch(ExpenseActions.getExpense({ id }));
  }

  fetchExpenses() {
    this.store.dispatch(ExpenseActions.fetchExpenses());
  }

  resetExpenseState() {
    this.store.dispatch(ExpenseActions.resetExpenseState());
  }

  selectExpense(id: number) {
    this.store.dispatch(ExpenseActions.selectExpense({ id }));
  }

  updateExpense(expense: ExpenseModel) {
    this.store.dispatch(ExpenseActions.updateExpense({ expense }));
  }

  private mapExpense(expense: ExpenseModel, inclVat: boolean) {
    const expenseClone = structuredClone(expense) as ExpenseModel;
    expenseClone.amount.value = inclVat ? expenseClone.amount.value * (1 + expenseClone.amount.vatPercentage / 100) : expenseClone.amount.value;
    return expenseClone;
  }
}
