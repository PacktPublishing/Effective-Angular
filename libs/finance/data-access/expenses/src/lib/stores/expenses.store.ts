import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ExpenseModel } from '../models/expenses.interfaces';
import { ExpensesHttpService } from '../http/expenses.http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesStore {
  protected expensesApi = inject(ExpensesHttpService);

  private expense: Subject<ExpenseModel> = new Subject();
  expense$: Observable<ExpenseModel> = this.expense.asObservable();

  private expenses: BehaviorSubject<ExpenseModel[]> = new BehaviorSubject<ExpenseModel[]>([]);
  expenses$: Observable<ExpenseModel[]> = this.expenses.asObservable();

  private selectedExpense: BehaviorSubject<ExpenseModel | null> = new BehaviorSubject<ExpenseModel | null>(null);
  selectedExpense$: Observable<ExpenseModel | null> = this.selectedExpense.asObservable();

  private inclVat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  inclVat$: Observable<boolean> = this.inclVat.asObservable();

  private get currentExpenses(): ExpenseModel[] {
    return this.expenses.value;
  }

  addExpense(expense: ExpenseModel): void {
    this.expensesApi.post(expense).subscribe({
      next: (addedExpense) => {
        addedExpense.id = !addedExpense.id ? this.currentExpenses.length + 1 : addedExpense.id;
        this.expenses.next([...this.currentExpenses, addedExpense]);
      },
      error: (err) => { console.log('err ==>', err) }
    })
  }

  adjustVat(inclVat: boolean): void {
    this.inclVat.next(inclVat);
  }

  clearExpenseSelection(): void {
    this.selectedExpense.next(null);
  }

  deleteExpense(id: number): void {
    this.expensesApi.delete(id).subscribe({
      next: () => {
        this.expenses.next(this.currentExpenses.filter(expense => expense.id !== id));
      },
      error: (err) => { console.log('err ==>', err) }
    })
  }

  fetchExpenses(): void {
    this.expensesApi.get().subscribe({
      next: (expenses) => { console.log('Get ==>', expenses); this.expenses.next(expenses) },
      error: (err) => { console.log('err ==>', err) }
    })
  }

  getExpense(id: number): void {
    const expense = this.currentExpenses.find(expense => expense.id === id);
    expense ? this.expense.next(expense) : this.fetchExpenseById(id);
  }

  resetState(): void {
    this.expenses.next([]);
    this.selectedExpense.next(null);
    this.inclVat.next(false);
  }

  selectExpense(id: number): void {
    const expense = this.currentExpenses.find(expense => expense.id === id);
    expense ? this.selectedExpense.next(expense) : this.fetchExpenseById(id, true);
  }

  updateExpense(expense: ExpenseModel): void {
    this.expensesApi.put(expense).subscribe({
      next: (expense) => {
        this.expenses.next(this.currentExpenses.map(exp => exp.id === expense.id ? expense : exp));
      },
      error: (err) => { console.log('err ==>', err) }
    })
  }

  private fetchExpenseById(id: number, select = false) {
    this.expensesApi.getById(id).subscribe({
      next: (expense) => { select ? this.selectedExpense.next(expense) : this.expense.next(expense) },
      error: (err) => { console.log('err ==>', err) }
    })
  }

}
