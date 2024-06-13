import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ExpenseModel } from '../models/expenses.interfaces';
import { ExpensesHttpService } from '../http/expenses.http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesStore {
  protected expensesApi = inject(ExpensesHttpService);

  private expense: Subject<ExpenseModel> = new Subject();
  expense$: Observable<ExpenseModel> = this.expense.asObservable();

  private expensesState = signal<ExpenseModel[]>([]);
  expenses = this.expensesState as Signal<ExpenseModel[]>;

  private selectedExpenseState = signal<ExpenseModel | null>(null);
  selectedExpense = this.selectedExpenseState as Signal<ExpenseModel | null>;

  private inclVatState = signal<boolean>(false);
  inclVat = this.inclVatState as Signal<boolean>;

  addExpense(expense: ExpenseModel): void {
    this.expensesApi.post(expense).subscribe({
      next: (addedExpense) => {
        addedExpense.id = !addedExpense.id ? this.expenses().length + 1 : addedExpense.id;
        this.expensesState.set([...this.expenses(), addedExpense]);
      },
      error: (err) => { console.log('err ==>', err) }
    })
  }

  adjustVat(): void {
    this.inclVatState.set(!this.inclVat());
  }

  clearExpenseSelection(): void {
    this.selectedExpenseState.set(null);
  }

  deleteExpense(id: number): void {
    this.expensesApi.delete(id).subscribe({
      next: () => {
        this.expensesState.set(this.expenses().filter(expense => expense.id !== id));
      },
      error: (err) => { console.log('err ==>', err) }
    })
  }

  fetchExpenses(): void {
    this.expensesApi.get().subscribe({
      next: (expenses) => { this.expensesState.set(expenses); },
      error: (err) => { console.log('err ==>', err) }
    })
  }

  getExpense(id: number): void {
    const expense = this.expenses().find(expense => expense.id === id);
    expense ? this.expense.next(expense) : this.fetchExpenseById(id);
  }

  resetState(): void {
    this.expensesState.set([]);
    this.selectedExpenseState.set(null);
    this.inclVatState.set(false);
  }

  selectExpense(id: number): void {
    const expense = this.expenses().find(expense => expense.id === id);
    expense ? this.selectedExpenseState.set(expense) : this.fetchExpenseById(id, true);
  }

  updateExpense(expense: ExpenseModel): void {
    this.expensesApi.put(expense).subscribe({
      next: (expense) => {
        this.expensesState.set(this.expenses().map(exp => exp.id === expense.id ? expense : exp));
      },
      error: (err) => { console.log('err ==>', err) }
    })
  }

  private fetchExpenseById(id: number, select = false) {
    this.expensesApi.getById(id).subscribe({
      next: (expense) => { select ? this.selectedExpenseState.set(expense) : this.expense.next(expense) },
      error: (err) => { console.log('err ==>', err) }
    });
  }

}
