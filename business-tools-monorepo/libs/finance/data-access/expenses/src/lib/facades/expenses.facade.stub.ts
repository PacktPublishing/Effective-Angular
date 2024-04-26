import { Injectable, computed, signal } from '@angular/core';
import { ExpenseModel, ExpensesViewModel } from '../models/expenses.interfaces';
import { IExpensesFacade } from './expensesFacade.interface';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StubExpensesFacade implements IExpensesFacade {

  expensesSignal = signal<ExpenseModel[]>([]);
  inclVat = signal(false);
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
  selectedExpense = signal<ExpenseModel | null>(null);

  expenseSelector$ = of({
    "description": "Office Supplies",
    "amount": {
      "value": 50,
      "vatPercentage": 20
    },
    "date": "2019-01-04",
    "tags": [
      "printer"
    ],
    "id": 1
  });

  addExpense(expense: ExpenseModel) {
    this.expensesSignal.set([...this.expensesSignal(), expense]);
  }

  adjustVat() {
    this.inclVat.set(!this.inclVat());
  }

  clearExpenseSelection() {
    this.selectedExpense.set(null);
  }

  deleteExpense(id: number) {
    this.expensesSignal.set(this.expensesSignal().filter(expense => expense.id !== id));
  }

  getExpense(id: number) {
    this.selectedExpense.set(this.expensesSignal().find(expense => expense.id === id) || null);
  }

  fetchExpenses() {
    this.expensesSignal.set([
      {
        "description": "Office Supplies",
        "amount": {
          "value": 50,
          "vatPercentage": 20
        },
        "date": "2019-01-04",
        "tags": [
          "printer"
        ],
        "id": 1
      },
      {
        "description": "Travel",
        "amount": {
          "value": 100,
          "vatPercentage": 20
        },
        "date": "2024-01-05",
        "tags": [
          "travel",
          "train",
          "taxi"
        ],
        "id": 2
      },
      {
        "description": "Food",
        "amount": {
          "value": 50,
          "vatPercentage": 10
        },
        "date": "2024-01-05",
        "tags": [
          "food",
          "lunch"
        ],
        "id": 3
      }
    ]);
  }

  resetExpenseState() {
    this.expensesSignal.set([]);
    this.inclVat.set(false);
    this.selectedExpense.set(null);
  }

  selectExpense(id: number) {
    this.selectedExpense.set(this.expensesSignal().find(expense => expense.id === id) || null);
  }

  updateExpense(expense: ExpenseModel) {
    this.expensesSignal.set(this.expensesSignal().map(exp => exp.id === expense.id ? expense : exp));
  }

  private mapExpense(expense: ExpenseModel, inclVat: boolean) {
    const expenseClone = JSON.parse(JSON.stringify(expense)) as ExpenseModel;
    expenseClone.amount.value = inclVat ? expenseClone.amount.value * (1 + expenseClone.amount.vatPercentage / 100) : expenseClone.amount.value;
    return expenseClone;
  }
}
