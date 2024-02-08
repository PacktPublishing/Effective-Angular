import { ApplicationConfig } from '@angular/core';
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

export const appConfig: ApplicationConfig = {
  providers: [
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
  ],
};
// MockInterceptor
