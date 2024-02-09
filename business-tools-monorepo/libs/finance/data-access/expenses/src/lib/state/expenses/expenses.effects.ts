import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpensesHttpService } from "../../http/expenses.http";
import { catchError, map, of, switchMap } from "rxjs";
import { ExpenseModel } from "../../models/expenses.interfaces";
import { ExpenseActions, ExpenseSelectors } from "./index";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";

@Injectable({ providedIn: 'root' })
export class ExpensesEffects {
  private readonly actions = inject(Actions);
  private readonly expensesApi = inject(ExpensesHttpService);
  protected readonly store = inject(Store);

  expensesSignal = toSignal(this.store.select(ExpenseSelectors.selectExpenses), { initialValue: [] });

  fetchExpeses$ = createEffect(() =>
    this.actions.pipe(
      ofType(ExpenseActions.fetchExpenses.type),
      switchMap(() => this.expensesApi.get().pipe(
        map((expenses: ExpenseModel[]) => ExpenseActions.fetchExpensesSuccess({ expenses })),
        catchError(() => of(ExpenseActions.fetchExpensesFailed()))
      ))
    )
  );

  fetchExpese$ = createEffect(() =>
    this.actions.pipe(
      ofType(ExpenseActions.selectExpense.type),
      switchMap(({ id }) => {
        const expense = this.expensesSignal().find(expense => expense.id === id);
        return expense ? of(ExpenseActions.selectExpenseSuccess({ expense })) : this.expensesApi.getById(id).pipe(
          map((expense: ExpenseModel) => ExpenseActions.selectExpenseSuccess({ expense })),
          catchError(() => of(ExpenseActions.selectExpenseFailed())))
      })
    )
  );

  addExpense$ = createEffect(() =>
    this.actions.pipe(
      ofType(ExpenseActions.addExpense.type),
      switchMap(({ expense }) => this.expensesApi.post(expense).pipe(
        map((expense: ExpenseModel) => ExpenseActions.addExpenseSuccess({ expense })),
        catchError(() => of(ExpenseActions.addExpenseFailed()))
      ))
    )
  );

  deleteExpense$ = createEffect(() =>
    this.actions.pipe(
      ofType(ExpenseActions.deleteExpense.type),
      switchMap(({ id }) => this.expensesApi.delete(id).pipe(
        map((expense: ExpenseModel) => ExpenseActions.deleteExpenseSuccess({ id: expense.id as number })),
        catchError(() => of(ExpenseActions.deleteExpenseFailed()))
      ))
    )
  );

  getExpese$ = createEffect(() =>
    this.actions.pipe(
      ofType(ExpenseActions.getExpense.type),
      switchMap(({ id }) => {
        const expense = this.expensesSignal().find(expense => expense.id === id);
        return expense ? of(ExpenseActions.getExpenseSuccess({ expense })) : this.expensesApi.getById(id).pipe(
          map((expense: ExpenseModel) => ExpenseActions.getExpenseSuccess({ expense })),
          catchError(() => of(ExpenseActions.getExpenseFailed()))
        )
      })
    )
  );

  getExpenseSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(ExpenseActions.getExpenseSuccess.type),
      switchMap(({ expense }) => of(expense))
    ), { dispatch: false }
  );

  updateExpense$ = createEffect(() =>
    this.actions.pipe(
      ofType(ExpenseActions.updateExpense.type),
      switchMap(({ expense }) => this.expensesApi.put(expense).pipe(
        map((expense: ExpenseModel) => ExpenseActions.updateExpenseSuccess({ expense })),
        catchError(() => of(ExpenseActions.updateExpenseFailed()))
      ))
    )
  );
}
