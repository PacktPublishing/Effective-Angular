import { ExpenseModel, ExpensesFacade } from '@bt-libs/finance/data-access/expenses';
import { ChangeDetectionStrategy, Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent } from '@bt-libs/finance/ui/expenses-registration-forms';
import { ModalComponent } from '@bt-libs/shared/common-components';
import { TranslocoDirective } from '@ngneat/transloco';
import { TranslationService } from '../../translation.serive';
import { TranslocoCurrencyPipe, TranslocoDatePipe, TranslocoDecimalPipe } from '@ngneat/transloco-locale';

@Component({
  selector: 'business-tools-monorepo-expenses-overview-page',
  standalone: true,
  imports: [CommonModule, AddExpenseComponent, ModalComponent, TranslocoDirective, TranslocoCurrencyPipe, TranslocoDatePipe, TranslocoDecimalPipe],
  templateUrl: './expenses-overview-page.component.html',
  styleUrls: ['./expenses-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExpensesOverviewPageComponent implements OnInit {
  protected readonly expensesFacade = inject(ExpensesFacade);
  protected readonly translationService = inject(TranslationService);

  translationEventsEffect = effect(() => {
    if (this.translationService.translationsLoaded()) {
      console.log(this.translationService.translocoService.translate('expenses_overview_page.title'));
    }
  });

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
