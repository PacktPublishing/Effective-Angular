import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bt-libs-clock-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock-widget.component.html',
  styleUrls: ['./clock-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockWidgetComponent {}
