import { ExpenseModel } from '@bt-libs/finance/data-access/expenses';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
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
export default class ExpensesOverviewPageComponent {
  expenses = signal<ExpenseModel[]>([
    {
      id: 1,
      description: "Office Supplies",
      amount: {
        amountExclVat: 100,
        vatPercentage: 20,
      },
      date: "2024-01-04",
      tags: [
        "printer"
      ]
    },
    {
      id: 2,
      description: "Travel",
      amount: {
        amountExclVat: 50,
        vatPercentage: 20,
      },
      date: "2024-01-04",
      tags: [
        "train",
        "public transport",
      ]
    },
  ]);
  showAddExpenseModal = signal(false);
  showSummary = signal(false);
  summaryBtnText = computed(() => {
    console.log('summaryBtnText');
    return this.showSummary() ? 'Hide summary' : 'Show summary'
  });
  totalInclVat = computed(() => this.showSummary() ? this.expenses().reduce(
    (total, { amount: { amountExclVat, vatPercentage } }) => amountExclVat / 100 * (100 + vatPercentage) + total,
    0
  ) : null
  );

  e = effect(() => {
    console.log('effect', this.showSummary());
  })

  ngOnInit() {
    setTimeout(() => {
      this.showSummary.set(true);
      this.showSummary.set(false);
      this.showSummary.set(true);
    }, 5000);
  }

  onSummaryChange() {
    this.showSummary.update(showSummary => !showSummary);
  }

  onAddExpense(expenseToAdd: ExpenseModel) {
    this.expenses.update(expenses => [...expenses, expenseToAdd]);
    this.showAddExpenseModal.set(false);
  }

}
