import { ClockWidgetComponent } from './../clock-widget/clock-widget.component';
import { WeatherWidgetComponent } from './../weather-widget/weather-widget.component';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widgets } from './widgets.enum';

@Component({
  selector: 'bt-libs-defer-widget',
  standalone: true,
  imports: [CommonModule, WeatherWidgetComponent, ClockWidgetComponent],
  templateUrl: './defer-widget.component.html',
  styleUrls: ['./defer-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferWidgetComponent {
  @Input() activeWidget!: Widgets;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() widgetData!: any;
  widgets = Widgets;
}
