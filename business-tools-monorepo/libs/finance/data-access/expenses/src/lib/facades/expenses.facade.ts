import { Injectable, computed, inject } from '@angular/core';
import { ExpensesStore } from '../stores/expenses.store';
import { ExpenseModel, ExpensesViewModel } from '../models/expenses.interfaces';
import { map } from 'rxjs';
import { IExpensesFacade } from './expensesFacade.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpensesFacade implements IExpensesFacade {
  protected readonly expensesStore = inject(ExpensesStore);

  expenseSelector$ = this.expensesStore.expense$.pipe(map(expense => this.mapExpense(expense, this.expensesStore.inclVat())));

  inclVat = this.expensesStore.inclVat;
  selectedExpense = this.expensesStore.selectedExpense;

  expenses = computed<ExpensesViewModel>(() => {
    const inclVat = this.expensesStore.inclVat();
    return {
      expenses: this.expensesStore.expenses().map(expense => this.mapExpense(expense, inclVat)),
      inclVat,
      total: this.expensesStore.expenses().reduce((acc, expense) => {
        return acc + (inclVat ? (expense.amount.value * (1 + expense.amount.vatPercentage / 100)) : expense.amount.value);
      }, 0),
    }
  });

  addExpense(expense: ExpenseModel) {
    this.expensesStore.addExpense(expense);
  }

  adjustVat() {
    this.expensesStore.adjustVat();
  }

  clearExpenseSelection() {
    this.expensesStore.clearExpenseSelection();
  }

  deleteExpense(id: number) {
    this.expensesStore.deleteExpense(id);
  }

  getExpense(id: number) {
    this.expensesStore.getExpense(id);
  }

  fetchExpenses() {
    this.expensesStore.fetchExpenses();
  }

  resetExpenseState() {
    this.expensesStore.resetState();
  }

  selectExpense(id: number) {
    this.expensesStore.selectExpense(id);
  }

  updateExpense(expense: ExpenseModel) {
    this.expensesStore.updateExpense(expense);
  }

  private mapExpense(expense: ExpenseModel, inclVat: boolean) {
    const expenseClone = structuredClone(expense) as ExpenseModel;
    expenseClone.amount.value = inclVat ? expenseClone.amount.value * (1 + expenseClone.amount.vatPercentage / 100) : expenseClone.amount.value;
    return expenseClone;
  }
}
