import { ApplicationConfig } from '@angular/core';
import {
  TitleStrategy,
  provideRouter
} from '@angular/router';
import { TemplatePageTitleStrategy, appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
  ],
};
