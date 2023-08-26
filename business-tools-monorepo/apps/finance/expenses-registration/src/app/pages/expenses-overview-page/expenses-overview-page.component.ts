import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'business-tools-monorepo-expenses-overview-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-overview-page.component.html',
  styleUrls: ['./expenses-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExpensesOverviewPageComponent {}
