import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEATHERWIDGET, WeatherWidgetData } from '../widget-container/widet-tokens';

@Component({
  selector: 'bt-libs-weather-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherWidgetComponent {
  widgetData: WeatherWidgetData = inject(WEATHERWIDGET);
}