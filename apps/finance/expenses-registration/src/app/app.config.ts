import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  TitleStrategy,
  provideRouter,
  withComponentInputBinding
} from '@angular/router';
import { TemplatePageTitleStrategy, appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MockInterceptor } from '@bt-libs/shared/data-access/generic-http';
import { provideState, provideStore } from '@ngrx/store';
import { expensesFeatureKey, expensesReducer, ExpensesEffects } from '@bt-libs/finance/data-access/expenses';
import { provideEffects } from '@ngrx/effects';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { provideTranslocoLocale } from '@ngneat/transloco-locale';
import { APP_BASE_HREF } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_BASE_HREF, useValue: isDevMode() ? '' : '/Effective-Angular/' },
    provideStore(),
    provideState({ name: expensesFeatureKey, reducer: expensesReducer }),
    provideEffects(ExpensesEffects),
    provideAnimations(),
    provideHttpClient(withInterceptors([MockInterceptor])),
    provideRouter(appRoutes, withComponentInputBinding()),
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    provideTransloco({
      config: {
        availableLangs: ['en', 'nl'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    provideTranslocoLocale({
      langToLocaleMapping: {
        en: 'en-US',
        nl: 'nl-NL'
      },
      // localeToCurrencyMapping: {}
    })
  ],
};
// MockInterceptor
