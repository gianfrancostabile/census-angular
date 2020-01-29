import { Component, OnInit, Input } from '@angular/core';
import { NavbarItem } from 'src/app/models/navbar-item';

@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrls: ['./navbar-button.component.css']
})
export class NavbarButtonComponent implements OnInit {
  @Input() buttonData: NavbarItem;
  private isLink: boolean = false;

  ngOnInit() {
    this.isLink = !!(this.buttonData && this.buttonData.link);
  }

}
