import { Route } from '@angular/router';
import ExpensesOverviewPageComponent from '@pages/expenses-overview-page/expenses-overview-page.component';
import HomePageComponent from '@pages/home-page/home-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent
    // loadComponent: () => import('./pages/home/home.component')
  },
  {
    path: 'expenses-overview',
    component: ExpensesOverviewPageComponent
    // loadComponent: () => import('./pages/expenses-overview-page/expenses-overview-page.component')
  }
];
