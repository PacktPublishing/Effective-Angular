import { Directive, Input } from '@angular/core';
import { AbstractControl, Validator, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[btLibsUtilMaxWordCount]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: MaxWordCountDirective, multi: true }
  ]
})
export class MaxWordCountDirective implements Validator {
  @Input('btLibsUtilMaxWordCount') maxWords = 1;

  validate(control: AbstractControl): ValidationErrors | null {
    const wordCount = control?.value?.trim().split(' ').length;
    return wordCount > this.maxWords ? { btLibsUtilMaxWordCount: { count: wordCount } } : null;
  }
}
