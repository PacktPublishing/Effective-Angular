import { createAction, props } from '@ngrx/store';
import { ExpenseModel } from '../../models/expenses.interfaces';

export const fetchExpenses = createAction(`[Expenses] Fetch Expenses`);
export const fetchExpensesSuccess = createAction(`[Expenses] Fetch Expenses Success`, props<{ expenses: ExpenseModel[] }>());
export const fetchExpensesFailed = createAction(`[Expenses] Fetch Expenses Failed`);

export const addExpense = createAction(`[Expenses] Add Expense`, props<{ expense: ExpenseModel }>());
export const addExpenseSuccess = createAction(`[Expenses] Add Expense Success`, props<{ expense: ExpenseModel }>());
export const addExpenseFailed = createAction(`[Expenses] Add Expense Failed`);

export const adjustVat = createAction(`[Expenses] Adjust incl vat`);

export const clearExpenseSelection = createAction(`[Expenses] Clear selection`);

export const deleteExpense = createAction(`[Expenses] Delete Expenses`, props<{ id: number }>());
export const deleteExpenseSuccess = createAction(`[Expenses] Delete Expenses Success`, props<{ id: number }>());
export const deleteExpenseFailed = createAction(`[Expenses] Delete Expenses Failed`);

export const getExpense = createAction(`[Expenses] Get Expenses`, props<{ id: number }>());
export const getExpenseSuccess = createAction(`[Expenses] Get Expenses Success`, props<{ expense: ExpenseModel }>());
export const getExpenseFailed = createAction(`[Expenses] Get Expenses Failed`);

export const resetExpenseState = createAction(`[Expenses] Reset state`);

export const selectExpense = createAction(`[Expenses] Select Expenses`, props<{ id: number }>());
export const selectExpenseSuccess = createAction(`[Expenses] Select Expenses Success`, props<{ expense: ExpenseModel }>());
export const selectExpenseFailed = createAction(`[Expenses] Fetch Expense Failed`);

export const updateExpense = createAction(`[Expenses] Update Expenses`, props<{ expense: ExpenseModel }>());
export const updateExpenseSuccess = createAction(`[Expenses] Update Expenses Success`, props<{ expense: ExpenseModel }>());
export const updateExpenseFailed = createAction(`[Expenses] Update Expenses Failed`);
