import { Injectable } from '@angular/core';
import { Country } from 'src/app/models/country';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getCountries(): Observable<Country[]> {
    return new Observable<Country[]>(observer => {
      const token = this.userService.getAuthenticationToken();
      if (token) {
        this.http.get('http://localhost:9090/census/countries', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).subscribe(
          (countries: string[]) => {
            this.http.get(`https://restcountries.eu/rest/v2/alpha?codes=${countries.join(';')}`)
              .pipe(
                map((response: any) => response.map((country: any) => ({ isoCode: country.alpha2Code, name: country.name })))
              )
              .subscribe(
                (countries: Country[]) => observer.next(countries),
                () => observer.next([])
              );
          },
          () => observer.next([]),
        );
      } else {
        observer.next([]);
      }
    });
  }
}
