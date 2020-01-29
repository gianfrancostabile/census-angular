import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  private isUserLogged: boolean = false;

  constructor(private userService: UserService) {
    this.userService.isUserLogged.subscribe(isLogged => this.isUserLogged = isLogged);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isUserLogged;
  }

}
