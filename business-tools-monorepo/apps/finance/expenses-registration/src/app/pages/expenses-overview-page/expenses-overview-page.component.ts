import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent, AddExpenseReactive } from '@bt-libs/finance/ui/expenses-registration-forms';
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
  addExpenseShown = false;

  protected readonly cd = inject(ChangeDetectorRef);
  // protected readonly expensesApi = inject(ExpensesHttpService);
  // protected readonly destroyRef = inject(DestroyRef);

  onAddExpense(expense: AddExpenseReactive) {
    console.log('addExpense ==>', expense);
  }

  // ngOnInit() {
  //   // eslint-disable-next-line rxjs/no-ignored-error, rxjs-angular/prefer-takeuntil
  //   this.expensesApi.get().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => { console.log('data ==>', data); });
  // }

}
