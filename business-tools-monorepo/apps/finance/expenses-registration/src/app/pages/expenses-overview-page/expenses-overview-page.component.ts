import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent, AddExpenseReactive } from '@bt-libs/finance/ui/expenses-registration-forms';
import { DisplayScalesComponent, ModalComponent, ScalesProjectionDirective, SelectComponent, WidgetContainerComponent } from '@bt-libs/shared/common-components';

@Component({
  selector: 'business-tools-monorepo-expenses-overview-page',
  standalone: true,
  imports: [CommonModule, AddExpenseComponent, ModalComponent, DisplayScalesComponent, ScalesProjectionDirective, SelectComponent, WidgetContainerComponent],
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

  onOptionChange(value: any) {
    console.log('onOptionChange ==>', value);
  }
}
