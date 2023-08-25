import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bt-libs-ui-link-list-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link-list-sidebar.component.html',
  styleUrls: ['./link-list-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkListSidebarComponent {}
