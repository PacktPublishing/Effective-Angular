import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'expenses-overview', pathMatch: 'full' },
  {
    path: 'expenses-overview',
    loadComponent: () => import('../pages/expenses-overview-page/expenses-overview-page.component')
  }
];
