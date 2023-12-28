import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent, AddExpenseReactive } from '@bt-libs/finance/ui/expenses-registration-forms';
import { DeferWidgetComponent, DisplayScalesComponent, ModalComponent, ScalesProjectionDirective, SelectComponent, WidgetContainerComponent, Widgets } from '@bt-libs/shared/common-components';

@Component({
  selector: 'business-tools-monorepo-expenses-overview-page',
  standalone: true,
  imports: [CommonModule, AddExpenseComponent, ModalComponent, DisplayScalesComponent, ScalesProjectionDirective, SelectComponent, WidgetContainerComponent, DeferWidgetComponent],
  templateUrl: './expenses-overview-page.component.html',
  styleUrls: ['./expenses-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExpensesOverviewPageComponent {
  addExpenseShown = false;
  // widget: WidgetOption = widgetLoaders.weatherWidget;
  // injector: Injector | null = Injector.create({ providers: [{ provide: WEATHERWIDGET, useValue: { city: 'Amsterdam', message: 'Sunny' } }] });
  widget!: Widgets;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  widgetData: any = null;

  protected readonly cd = inject(ChangeDetectorRef);

  ngOnInit() {
    setInterval(() => {
      // this.widget = this.widget === widgetLoaders.clockWidget ? widgetLoaders.weatherWidget : widgetLoaders.clockWidget;
      // this.injector = this.widget === widgetLoaders.clockWidget ? null : Injector.create({ providers: [{ provide: WEATHERWIDGET, useValue: { city: 'Amsterdam', message: 'Sunny' } }] });
      // this.injector = this.widget === widgetLoaders.clockWidget ? null : Injector.create({ providers: [{ provide: WEATHERWIDGET, useValue: { city: 'Amsterdam', message: 'Sunny' } }] });
      this.widget = this.widget === Widgets.Clock ? Widgets.Weather : Widgets.Clock;
      this.widgetData = this.widget === Widgets.Clock ? null : { city: 'Amsterdam', message: 'Sunny' };
      this.cd.detectChanges();
    }, 5000)
  }

  addExpense(expense: AddExpenseReactive) {
    console.log('addExpense ==>', expense);
  }

  onOptionChange(value: unknown) {
    console.log('onOptionChange ==>', value);
  }
}
