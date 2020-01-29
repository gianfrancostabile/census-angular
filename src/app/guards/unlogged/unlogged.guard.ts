import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UnloggedGuard implements CanActivate {

  private isUserLogged: boolean = false;

  constructor(private userService: UserService) {
    this.userService.isUserLogged.subscribe(userLogged => this.isUserLogged = userLogged);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return !this.isUserLogged;
  }
  
}
