import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicControl } from './dynamic-control.interfaces';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'bt-libs-ui-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  @Input() formModelConfig: DynamicControl[] = [];

  @Output() outputForm = new EventEmitter();

  formModel = new FormGroup({});

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formModelConfig']) {
      this.formModel = new FormGroup({});
      this.formModelConfig.forEach((control) => {
        this.formModel.addControl(
          control.controlKey,
          new FormControl(control.defaultValue, { updateOn: control.updateOn, validators: control.validators }));
      });
    }
  }

  onSubmit() {
    this.outputForm.emit(structuredClone(this.formModel.value));
    this.formModel.reset();
  }
}
