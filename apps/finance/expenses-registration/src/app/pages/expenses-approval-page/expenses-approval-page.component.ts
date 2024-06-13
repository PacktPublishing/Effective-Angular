import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'business-tools-monorepo-expenses-approval-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-approval-page.component.html',
  styleUrls: ['./expenses-approval-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExpensesApprovalPageComponent {}
