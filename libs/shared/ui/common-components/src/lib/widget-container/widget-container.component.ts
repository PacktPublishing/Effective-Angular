import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Type, inject, SimpleChanges, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetOption } from './widget-loaders';

@Component({
  selector: 'bt-libs-widget-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetContainerComponent {
  @Input() injector!: Injector | null;
  @Input({ required: true }) widgetLoader!: WidgetOption;
  widget: widget = { component: null, injector: null };

  protected readonly cd = inject(ChangeDetectorRef);

  async ngOnChanges(changes: SimpleChanges) {
    const widgetLoader: WidgetOption = changes['widgetLoader'].currentValue;
    const widget = await widgetLoader();
    this.widget = { component: widget[Object.keys(widget)[0]], injector: this.injector };
    this.cd.detectChanges();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface widget { component: Type<any> | null; injector: Injector | any }
