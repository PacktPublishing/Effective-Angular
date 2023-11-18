import { InjectionToken } from "@angular/core";

export interface WeatherWidgetData {
  city: string;
  message: string;
}

export const WEATHERWIDGET = new InjectionToken<WeatherWidgetData>('weather widgets');
