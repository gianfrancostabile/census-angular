import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarData } from './models/navbar-data';
import { UserService } from './services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private isUserLoggedSubscription: Subscription;
  private navbarDataUserLogout: NavbarData = {
    home: { content: 'Inicio', link: '/' },
    rightItems: [
      { content: 'Iniciar Sesión', link: '/login' },
      { content: 'Registrarse', link: '/register' }
    ]
  };
  private navbarDataUserLogged: NavbarData = {
    home: { content: 'Inicio', link: '/' },
    leftItems: [
      { content: 'Buscar', link: '/census' }
    ],
    rightItems: [
      { content: 'Cerrar Sesión', action: this.logout.bind(this) },
    ]
  };

  navbarData: NavbarData = this.navbarDataUserLogout;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isUserLoggedSubscription = this.userService.isUserLogged.subscribe(isLogged => {
      if (isLogged) {
        this.navbarData = this.navbarDataUserLogged;
      } else {
        this.navbarData = this.navbarDataUserLogout;
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.isUserLoggedSubscription.unsubscribe();
  }

  logout() {
    this.userService.logout();
  }
}
