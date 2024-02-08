import { ExpenseModel, ExpensesFacade } from '@bt-libs/finance/data-access/expenses';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent } from '@bt-libs/finance/ui/expenses-registration-forms';
import { ModalComponent } from '@bt-libs/shared/common-components';

@Component({
  selector: 'business-tools-monorepo-expenses-overview-page',
  standalone: true,
  imports: [CommonModule, AddExpenseComponent, ModalComponent],
  templateUrl: './expenses-overview-page.component.html',
  styleUrls: ['./expenses-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExpensesOverviewPageComponent implements OnInit {
  protected readonly expensesFacade = inject(ExpensesFacade);

  expenses = this.expensesFacade.expenses;

  showAddExpenseModal = signal(false);
  showSummary = signal(false);
  summaryBtnText = computed(() => this.showSummary() ? 'Hide summary' : 'Show summary');

  ngOnInit() {
    this.expensesFacade.fetchExpenses();
  }

  onSummaryChange() {
    this.showSummary.update(showSummary => !showSummary);
  }

  onAddExpense(expenseToAdd: ExpenseModel) {
    this.expensesFacade.addExpense(expenseToAdd);
  }

}
