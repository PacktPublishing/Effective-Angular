import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bt-libs-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input({ required: true }) options!: unknown[];
  @Input() optionTemplate?: TemplateRef<unknown>;

  @Input() selectedIndex?: number;
  @Input() labelKey?: string;
  @Output() selectedChange = new EventEmitter<unknown>();

  onOptionChange(index: any) {
    this.selectedIndex = index.target.value;
    this.selectedChange.emit(this.options[index.target.value]);
  }
}
