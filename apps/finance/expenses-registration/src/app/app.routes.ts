import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, ResolveFn, Route, RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`Expenses App - ${title}`);
    }
  }
}

export const titleResolver: ResolveFn<string> =
  (route: ActivatedRouteSnapshot) =>
    route.routeConfig?.path?.replace('-', ' ') ?? '';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/expenses-overview'
  },
  { path: 'expenses-overview', loadComponent: () => import('./pages/expenses-overview-page/expenses-overview-page.component'), title: titleResolver },
  { path: 'expenses-approval', loadComponent: () => import('./pages/expenses-approval-page/expenses-approval-page.component'), title: titleResolver },
];
