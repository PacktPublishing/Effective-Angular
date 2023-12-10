import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent, AddExpenseReactive } from '@bt-libs/finance/ui/expenses-registration-forms';
import { ModalComponent } from '@bt-libs/shared/common-components';
import { LogMethod } from '@bt-libs/shared/util/custom-decorators';

@Component({
  selector: 'business-tools-monorepo-expenses-overview-page',
  standalone: true,
  imports: [CommonModule, AddExpenseComponent, ModalComponent],
  templateUrl: './expenses-overview-page.component.html',
  styleUrls: ['./expenses-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExpensesOverviewPageComponent {
  addExpenseShown = false;

  protected readonly cd = inject(ChangeDetectorRef);

  onAddExpense(expense: AddExpenseReactive) {
    console.log('addExpense ==>', expense);
  }

  ngOnInit() {
    this.test(1, 2);
  }

  @LogMethod
  test(a: number, b: number) {
    return a + b;
  }
}
