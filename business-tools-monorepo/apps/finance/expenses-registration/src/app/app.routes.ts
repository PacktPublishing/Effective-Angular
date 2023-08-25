import { LinkListSidebarComponent } from '@bt-libs/finance/ui/sidebars';
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
    (route: ActivatedRouteSnapshot) => {
      const formattedTitle = route.routeConfig?.path?.replace('-', ' ');
      return formattedTitle ? formattedTitle : '';
    };

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/expenses-overview(sidebar:test)'
  },
  { path: 'expenses-overview', loadComponent: () => import('./pages/expenses-overview-page/expenses-overview-page.component'), title: titleResolver },
  { path: 'expenses-approval', loadComponent: () => import('./pages/expenses-approval-page/expenses-approval-page.component'), title: titleResolver },
  { path: 'test', component: LinkListSidebarComponent, outlet: 'sidebar' },
];
