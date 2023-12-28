import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function maxWordCountValidator(maxWords: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const wordCount = control?.value?.trim().split(' ').length;
    return wordCount > maxWords ? { maxWordCount: { count: wordCount } } : null;
  };
}
