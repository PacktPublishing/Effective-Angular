import { ExpenseModel } from '@bt-libs/finance/data-access/expenses';
// import { ExpensesHttpService } from '@bt-libs/finance/data-access/expenses';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent, AddExpenseReactive, DynamicControl, DynamicFormComponent } from '@bt-libs/finance/ui/expenses-registration-forms';
import { ModalComponent } from '@bt-libs/shared/common-components';
import { Validators } from '@angular/forms';
// import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'business-tools-monorepo-expenses-overview-page',
  standalone: true,
  imports: [CommonModule, AddExpenseComponent, ModalComponent],
  templateUrl: './expenses-overview-page.component.html',
  styleUrls: ['./expenses-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExpensesOverviewPageComponent {
  addExpenseModalShown = signal(false);
  // expenses = signal<ExpenseModel[]>([
  //   { description: "Laptop", amount: 2000, percentage: 20, vat: 400, id: 1 },
  //   { description: "Travel", amount: 50, percentage: 20, vat: 10, id: 2 },
  //   { description: "Food", amount: 10, percentage: 10, vat: 1, id: 3 },
  // ]);

  onAddExpense(expenseToAdd: AddExpenseReactive) {
    console.log(expenseToAdd);
  }

}
