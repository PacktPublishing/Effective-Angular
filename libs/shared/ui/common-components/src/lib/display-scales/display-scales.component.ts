import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScalesProjectionDirective } from './scales-projection.directive';

@Component({
  selector: 'bt-libs-display-scales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-scales.component.html',
  styleUrls: ['./display-scales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayScalesComponent {
  @Input({ required: true }) scaleSizes!: number[];
  // @Input({ required: true }) template!: TemplateRef<any>;

  @ContentChild(ScalesProjectionDirective) content!: ScalesProjectionDirective;
}
