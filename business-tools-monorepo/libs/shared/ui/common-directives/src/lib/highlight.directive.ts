/* eslint-disable @angular-eslint/no-input-rename */
import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: 'span:not([noHighlight]), [btLibsUiHighlight]:not(label)',
  standalone: true,
})
export class HighlightDirective {

  @Input('btLibsUiHighlight') background = 'black';
  @Input() textColor = 'white';

  private el = inject(ElementRef).nativeElement;

  private originalColor = 'black';
  private originalBackground = 'white';

  @HostListener('mouseenter') onMouseEnter() {
    this.originalColor = this.el.style.color;
    this.originalBackground = this.el.style.backgroundColor;

    this.el.style.backgroundColor = this.background;
    this.el.style.color = this.textColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.style.backgroundColor = this.originalBackground;
    this.el.style.color = this.originalColor;
  }
}
