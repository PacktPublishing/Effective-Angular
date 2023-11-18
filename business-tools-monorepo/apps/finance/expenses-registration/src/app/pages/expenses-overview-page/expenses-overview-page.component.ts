import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent, AddExpenseReactive } from '@bt-libs/finance/ui/expenses-registration-forms';
import { DisplayScalesComponent, ModalComponent, ScalesProjectionDirective, SelectComponent, WEATHERWIDGET, WidgetContainerComponent, WidgetOption, widgetLoaders } from '@bt-libs/shared/common-components';

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
  widget: WidgetOption = widgetLoaders.weatherWidget;
  injector: Injector | null = Injector.create({ providers: [{ provide: WEATHERWIDGET, useValue: { city: 'Amsterdam', message: 'Sunny' } }] });

  protected readonly cd = inject(ChangeDetectorRef);

  ngOnInit() {
    setInterval(() => {
      this.widget = this.widget === widgetLoaders.clockWidget ? widgetLoaders.weatherWidget : widgetLoaders.clockWidget;
      this.injector = this.widget === widgetLoaders.clockWidget ? null : Injector.create({ providers: [{ provide: WEATHERWIDGET, useValue: { city: 'Amsterdam', message: 'Sunny' } }] });
      this.cd.detectChanges();
    }, 5000)
  }

  addExpense(expense: AddExpenseReactive) {
    console.log('addExpense ==>', expense);
  }

  onOptionChange(value: any) {
    console.log('onOptionChange ==>', value);
  }
}
