import { ExpenseActions } from './index';
import { ExpensesState } from '../../models/expenses.interfaces';
import { createReducer, on } from '@ngrx/store';

export const initialExpensesState: Readonly<ExpensesState> = {
  expenses: [],
  selectedExpense: null,
  isLoading: false,
  inclVat: false,
  error: null
};

export const expensesReducer = createReducer<ExpensesState>(
  initialExpensesState,
  on(ExpenseActions.fetchExpenses, (state) => ({
    ...state,
    isLoading: true
  })),
  on(ExpenseActions.fetchExpensesSuccess, (state, { expenses }) => ({
    ...state,
    isLoading: false,
    expenses,
    error: null
  })),
  on(ExpenseActions.fetchExpensesFailed, (state) => ({
    ...state,
    isLoading: false,
    error: 'Failed to fetch expenses!'
  })),
  on(ExpenseActions.addExpense, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ExpenseActions.addExpenseSuccess, (state, { expense }) => ({
    ...state,
    isLoading: false,
    expenses: [...(state.expenses), expense],
    error: null
  })),
  on(ExpenseActions.addExpenseFailed, (state) => ({
    ...state,
    isLoading: false,
    error: 'Failed to add expense!'
  })),
  on(ExpenseActions.adjustVat, (state) => ({
    ...state,
    inclVat: !state.inclVat
  })),
  on(ExpenseActions.clearExpenseSelection, (state) => ({
    ...state,
    selectedExpense: null
  })),
  on(ExpenseActions.deleteExpense, (state) => ({
    ...state,
    isLoading: true
  })),
  on(ExpenseActions.deleteExpenseSuccess, (state, { id }) => ({
    ...state,
    isLoading: false,
    error: null,
    expenses: state.expenses.filter(expense => expense.id !== id)
  })),
  on(ExpenseActions.deleteExpenseFailed, (state) => ({
    ...state,
    isLoading: false,
    error: 'Failed to delete expense!'
  })),
  on(ExpenseActions.resetExpenseState, () => initialExpensesState),
  on(ExpenseActions.selectExpense, (state) => ({
    ...state,
    isLoading: true
  }
  )),
  on(ExpenseActions.selectExpenseSuccess, (state, { expense }) => ({
    ...state,
    isLoading: false,
    selectedExpense: expense,
    error: null
  })),
  on(ExpenseActions.selectExpenseFailed, (state) => ({
    ...state,
    isLoading: false,
    selectedExpense: null,
    error: 'Failed to fetch expense!'
  })),
  on(ExpenseActions.updateExpense, (state) => ({
    ...state,
    isLoading: true
  })),
  on(ExpenseActions.updateExpenseSuccess, (state, { expense }) => ({
    ...state,
    isLoading: false,
    error: null,
    expenses: state.expenses.map(exp => exp.id === expense.id ? expense : exp)
  })),
  on(ExpenseActions.updateExpenseFailed, (state) => ({
    ...state,
    isLoading: false,
    error: 'Failed to update expense!'
  }))
);

export const expensesFeatureKey = 'expenses';
