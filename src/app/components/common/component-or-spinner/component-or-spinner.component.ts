import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-or-spinner',
  templateUrl: './component-or-spinner.component.html',
})
export class ComponentOrSpinnerComponent {
  @Input() spin: boolean = false;
}
