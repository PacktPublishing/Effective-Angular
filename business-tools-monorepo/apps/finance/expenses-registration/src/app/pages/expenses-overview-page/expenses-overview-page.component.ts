import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent, AddExpenseReactive, DynamicControl, DynamicFormComponent } from '@bt-libs/finance/ui/expenses-registration-forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'business-tools-monorepo-expenses-overview-page',
  standalone: true,
  imports: [CommonModule, AddExpenseComponent, DynamicFormComponent],
  templateUrl: './expenses-overview-page.component.html',
  styleUrls: ['./expenses-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExpensesOverviewPageComponent {

  formValues = { description: 'Test', amount: { amountExclVat: 10, vatPercentage: 21 }, date: ['2023-10-15'], tags: ['test', 'test2'] }

  formModelConfig: DynamicControl[] = [
    {
      controlKey: 'description',
      formFieldType: 'input',
      inputType: 'text',
      label: 'Description',
      defaultValue: '',
      updateOn: 'change',
      validators: [Validators.required]
    },
    {
      controlKey: 'amount',
      formFieldType: 'input',
      inputType: 'number',
      label: 'Amount excl. VAT',
      defaultValue: null,
      updateOn: 'change',
      validators: [Validators.required]
    },
    {
      controlKey: 'percentage',
      formFieldType: 'input',
      inputType: 'number',
      label: 'VAT percentage',
      defaultValue: null,
      updateOn: 'change',
      validators: [Validators.required, Validators.min(0), Validators.max(100)]
    },
    {
      controlKey: 'date',
      formFieldType: 'input',
      inputType: 'date',
      label: 'Date',
      defaultValue: '',
      updateOn: 'change',
      validators: [Validators.required]
    },
  ]
  addExpense(expense: AddExpenseReactive) {
    console.log('addExpense ==>', expense);
  }
}
