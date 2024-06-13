const widgetKeys = ['weatherWidget', 'clockWidget'] as const;

type WidgetKey = typeof widgetKeys[number];

export type WidgetLoader = { [key in WidgetKey]: () => Promise<any> };

export const widgetLoaders: WidgetLoader = {
  weatherWidget: () => import('../weather-widget/weather-widget.component'),
  clockWidget: () => import('../clock-widget/clock-widget.component'),
};

export type WidgetOption = WidgetLoader[keyof WidgetLoader];
