import { Component, Input } from '@angular/core';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent {
  @Input() person: Person;
}
