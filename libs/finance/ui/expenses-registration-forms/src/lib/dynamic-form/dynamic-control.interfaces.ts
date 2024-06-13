import { ValidatorFn } from "@angular/forms";

export interface DynamicControl {
  controlKey: string;
  formFieldType?: 'input' | 'select';
  inputType?: string;
  label?: string;
  defaultValue?: any;
  selectOptions?: string[];
  updateOn: 'change' | 'blur' | 'submit';
  validators?: ValidatorFn[];
}
