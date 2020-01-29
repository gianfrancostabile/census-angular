import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isUserLogged: Observable<boolean> = this.isUserLoggedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateIsLoggedStatus();
  }

  private updateIsLoggedStatus() {
    const nextValue: boolean = !!localStorage.getItem('token');
    const currentValue: boolean = this.isUserLoggedSubject.getValue();
    if (nextValue !== currentValue) {
      this.isUserLoggedSubject.next(currentValue);
    }
  }

  register(user: User): Observable<void> {
    return new Observable(observer => {
      if (user) {
        this.http.post('http://localhost:9090/census/user', user, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .subscribe(
            () => observer.next(),
            // TODO: Instead of return the status code, return another thing.
            (error) => observer.error(error.status),
          );
      } else {
        observer.error();
      }
    });
  }

  authenticate(user: User): Observable<void> {
    return new Observable(observer => {
      this.http.post('http://localhost:9090/census/authenticate', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .subscribe(
          (token: string) => {
            localStorage.setItem('token', token);
            this.updateIsLoggedStatus();
            observer.next();
          },
          (error) => {
            this.updateIsLoggedStatus();
            // TODO: Instead of return the status code, return another thing.
            observer.error(error.status);
          }
        );
    });
  }

  getAuthenticationToken(): string {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.updateIsLoggedStatus();
  }
}
