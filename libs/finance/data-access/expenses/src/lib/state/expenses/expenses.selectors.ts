import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpensesState } from '../../models/expenses.interfaces';
import { expensesFeatureKey } from './expenses.reducer';

export const selectExpensesState = createFeatureSelector<ExpensesState>(expensesFeatureKey);
export const selectExpenses = createSelector(selectExpensesState, (state) => state.expenses);
export const selectError = createSelector(selectExpensesState, (state) => state.error);
export const selectInclVat = createSelector(selectExpensesState, (state) => state.inclVat);
export const selectIsLoading = createSelector(selectExpensesState, (state) => state.isLoading);
export const selectSelectedExpense = createSelector(selectExpensesState, (state) => state.selectedExpense);
