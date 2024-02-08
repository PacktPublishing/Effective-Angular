import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpensesState } from '../../models/expenses.interfaces';
import { expensesFeatureKey } from './expenses.reducer';

export const selectExpensesState = createFeatureSelector<ExpensesState>(expensesFeatureKey);
export const selectExpenses = createSelector(selectExpensesState, (state) => state.expenses);
export const selectExpensesIsLoading = createSelector(selectExpensesState, (state) => state.isLoading);
export const selectInclVat = createSelector(selectExpensesState, (state) => state.inclVat);
export const selectSelectedExpense = createSelector(selectExpensesState, (state) => state.selectedExpense);
