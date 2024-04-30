import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "bt-libs-navbar",
  standalone: true,
  template: '',
})
export class StubNavbarComponent {
  @Input() navbarItems = [];
  @Input() languages = [];

  @Output() languageChange = new EventEmitter();
}
