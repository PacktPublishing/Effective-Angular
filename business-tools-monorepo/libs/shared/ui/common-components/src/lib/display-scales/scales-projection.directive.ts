import { Directive, TemplateRef } from "@angular/core";

@Directive({
  selector: '[btLibsScalesProjection]',
  standalone: true,
})
export class ScalesProjectionDirective {
  constructor(public templateRef: TemplateRef<unknown>) { }
}
