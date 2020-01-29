import { Injectable } from '@angular/core';
import { Person } from 'src/app/models/person';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PersonResponse } from 'src/app/models/person-response';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CensusService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getPerson(ssn: number, country: string): Observable<Person> {
    return new Observable<Person>(observer => {
      const token = this.userService.getAuthenticationToken();
      if (ssn && country && token) {
        this.http.post('http://localhost:9090/census/', JSON.stringify([ssn]), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            country
          }
        })
          .pipe(
            map((personResponse: PersonResponse) => (personResponse ? { ...personResponse.successList[0] } : undefined)),
          )
          .subscribe(
            (person: Person) => observer.next(person),
            () => observer.error()
          );
      } else {
        observer.error();
      }
    });
  }
}
