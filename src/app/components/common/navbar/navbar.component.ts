import { Component, Input } from '@angular/core';
import { NavbarData } from 'src/app/models/navbar-data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() navbarData: NavbarData;
}
