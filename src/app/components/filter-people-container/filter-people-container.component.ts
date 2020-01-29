import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../../models/person';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';
import { PersonFormData } from '../../models/person-form-data';
import { CensusService } from '../../services/census.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-people-container',
  templateUrl: './filter-people-container.component.html',
})
export class FilterPeopleContainerComponent implements OnInit, OnDestroy {
  private countriesSubscription: Subscription;
  private censusSubscription: Subscription;
  countries: Country[] = [];
  person: Person;
  waitingCountries: boolean = true;
  waitingPerson: boolean = false;
  drawPersonCard: boolean = false;

  constructor(private countryService: CountryService, private censusService: CensusService) { }

  ngOnInit() {
    this.countriesSubscription = this.countryService.getCountries()
      .subscribe(
        (countries: Country[]) => {
          this.countries = [...countries];
          this.waitingCountries = false;
        },
        () => {
          this.countries = [];
          this.waitingCountries = false;
        });
  }

  ngOnDestroy() {
    if (this.countriesSubscription) {
      this.countriesSubscription.unsubscribe();
    }
    if (this.censusSubscription) {
      this.censusSubscription.unsubscribe();
    }
  }

  onFormSubmit(personFormData: PersonFormData) {
    this.drawPersonCard = true;
    if (personFormData) {
      this.waitingPerson = true;
      this.censusSubscription = this.censusService.getPerson(personFormData.ssn, personFormData.country)
        .subscribe(
          person => {
            this.person = person;
            this.waitingPerson = false;
          },
          () => {
            this.person = undefined;
            this.waitingPerson = false;
          }
        );
    } else {
      this.person = undefined;
    }
  }
}
