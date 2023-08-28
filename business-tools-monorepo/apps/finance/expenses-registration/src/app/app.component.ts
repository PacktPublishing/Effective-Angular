import { NavbarComponent, NavbarItem } from '@bt-libs/shared/common-components';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  selector: 'business-tools-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navItems: NavbarItem[] = [{ label: 'expenses approval', route: '/expenses-approval' }];
}
