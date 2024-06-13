import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bt-libs-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  navbarItems = input([], { transform: addHome });
  languages = input<string[]>([]);

  @Output() languageChange = new EventEmitter();
}

function addHome(items: NavbarItem[]): NavbarItem[] {
  return [{ label: 'home', route: '/' }, ...items];
}

export interface NavbarItem {
  label: string;
  route: string
}
