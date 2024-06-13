import { Observable } from "rxjs";
import { ExpenseModel, ExpensesViewModel } from "../models/expenses.interfaces";
import { Signal } from "@angular/core";

export interface IExpensesFacade {
  expenseSelector$: Observable<ExpenseModel>;
  selectedExpense: Signal<ExpenseModel | null>;
  inclVat: Signal<boolean>;
  expenses: Signal<ExpensesViewModel>
  addExpense(expense: ExpenseModel): void;
  adjustVat(): void;
  clearExpenseSelection(): void;
  deleteExpense(id: number): void;
  fetchExpenses(): void;
  getExpense(id: number): void;
  resetExpenseState(): void;
  selectExpense(id: number): void;
  updateExpense(expense: ExpenseModel): void;
}
