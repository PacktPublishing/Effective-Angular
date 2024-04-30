import { NavbarComponent, NavbarItem } from '@bt-libs/shared/common-components';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './translation.serive';

@Component({
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  selector: 'business-tools-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected readonly translationService = inject(TranslationService);

  navItems: NavbarItem[] = [{ label: 'expenses approval', route: '/expenses-approval' }];
}
