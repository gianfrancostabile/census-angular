import { Component, Input } from '@angular/core';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-filter-person-card-container',
  templateUrl: './filter-person-card-container.component.html',
  styleUrls: ['./filter-person-card-container.component.css']
})
export class FilterPersonCardContainerComponent {
  @Input() person: Person;
}
