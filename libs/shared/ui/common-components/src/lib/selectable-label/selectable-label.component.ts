import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationTriggerMetadata, animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'bt-libs-selectable-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selectable-label.component.html',
  styleUrls: ['./selectable-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [selectedAnimation()],
})
export class SelectableLabelComponent {
  @Input() labelText!: string;
  @Input() get selected() {
    return this._selected;
  }
  set selected(selected) {
    this._selected = selected;
    this.animationState = selected ? 'selected' : 'deselected';
  }

  @Output() selectedChange = new EventEmitter<boolean>();

  private _selected = false;
  animationState = 'deselected';

  onSelectionChanged() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}

export function selectedAnimation(): AnimationTriggerMetadata {
  return trigger('selectedState', [
    state('selected', style({ backgroundColor: '#382632' })),
    state('deselected', style({ backgroundColor: '#455b66' })),
    transition(
      'selected <=> deselected',
      [animate('2s')]
    ),
  ])
}
