import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpense, AddExpenseComponent, AddExpenseReactive } from '@bt-libs/finance/ui/expenses-registration-forms';

@Component({
  selector: 'business-tools-monorepo-expenses-overview-page',
  standalone: true,
  imports: [CommonModule, AddExpenseComponent],
  templateUrl: './expenses-overview-page.component.html',
  styleUrls: ['./expenses-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExpensesOverviewPageComponent {

  formValues = { description: 'Test', amount: { amountExclVat: 10, vatPercentage: 21 }, date: ['2023-10-15'], tags: ['test', 'test2'] }

  addExpense(expense: AddExpenseReactive) {
    console.log('addExpense ==>', expense);
  }
}
