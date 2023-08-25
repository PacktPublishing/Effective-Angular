import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  selector: 'business-tools-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'finance-expenses-registration';
}
