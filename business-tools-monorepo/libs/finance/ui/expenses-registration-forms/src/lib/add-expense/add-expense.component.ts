import { ExpenseModel } from '@bt-libs/finance/data-access/expenses';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormRecord, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddExpense, AddExpenseReactive } from './add-expense.interface';
import { MaxWordCountDirective, maxWordCountValidator } from '@bt-libs/shared/util/form-validators';

@Component({
  selector: 'bt-libs-ui-add-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MaxWordCountDirective, ReactiveFormsModule],
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseComponent {
  // Template driven form:

  // @ViewChild('addExpenseForm') form!: NgForm;
  // @Input() expenseToAdd: AddExpense = {
  //   description: '',
  //   amountExclVat: null,
  //   vatPercentage: null,
  //   date: null
  // }

  // @Output() addExpense = new EventEmitter<AddExpense>();

  // onSubmit() {
  //   this.addExpense.emit(structuredClone(this.expenseToAdd));
  //   this.form.reset();
  // }


  // -------------------------------------------------------------------


  // Reactive form:

  @Input()
  public set expenseToAdd(value: ExpenseModel) {
    this.addExpenseForm.patchValue(value);

    this.addExpenseForm.controls.tags.clear();
    value.tags?.forEach(tag => {
      this.addExpenseForm.controls.tags.push(new FormControl(tag));
    });
  }

  @Output() addExpense = new EventEmitter<ExpenseModel>();

  addExpenseForm = new FormGroup({
    description: new FormControl('', [Validators.required, maxWordCountValidator(3)]),
    amount: new FormGroup({
      value: new FormControl<number | null>(null, [Validators.required]),
      vatPercentage: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    }),
    date: new FormControl<string | null>(null, [Validators.required]),
    tags: new FormArray<FormControl<string | null>>([
      new FormControl(''),
    ])
  });

  addTag() {
    this.addExpenseForm.controls.tags.insert(0, new FormControl(''));
  }

  removeTag(index: number) {
    this.addExpenseForm.controls.tags.removeAt(index);
  }

  onSubmit() {
    this.addExpense.emit(structuredClone(this.addExpenseForm.value as ExpenseModel));
    this.addExpenseForm.reset();
  }

}
