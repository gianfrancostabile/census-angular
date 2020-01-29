import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { PersonFormData } from 'src/app/models/person-form-data';
import { FormData } from 'src/app/models/form-data';

@Component({
  selector: 'app-filter-people-form',
  templateUrl: './filter-people-form.component.html',
  styleUrls: ['./filter-people-form.component.css']
})
export class FilterPeopleFormComponent implements OnChanges {
  private ssnDefaultValue: number = 0;
  private countryDefaultValue: string = '';
  searchPersonForm: FormGroup;
  formData: FormData;

  @Input() countries: Country[] = [];
  @Output() formSubmit: EventEmitter<PersonFormData> = new EventEmitter();

  ngOnChanges(changes) {
    const countries: Country[] = changes.countries.currentValue;
    if (countries && countries.length > 0) {
      this.formData = {
        fields: [
          {
            name: 'ssn',
            label: 'Documento de identidad:',
            type: 'number',
            value: this.ssnDefaultValue,
            validators: [Validators.required, Validators.min(0)]
          },
          {
            name: 'country',
            label: 'Pais:',
            type: 'select',
            value: this.countryDefaultValue,
            options: [...countries.map(country => ({ value: country.isoCode, name: country.name }))],
            validators: [Validators.required]
          }
        ],
        buttons: [
          { value: 'Buscar', style: 'info', action: this.onSubmit.bind(this) },
          { value: 'Limpiar', action: this.onClear.bind(this) }
        ],
        errorList: {
          'SSN_INVALID': 'Ingrese algún DNI mayor a 0',
          'COUNTRY_INVALID': 'Seleccione un pais',
        }
      };
    }
  }
  private errorId: string;

  onSubmit() {
    if (this.isFormValid()) {
      this.formSubmit.emit({ ssn: this.ssn, country: this.country });
    }
  }

  onClear() {
    this.searchPersonForm.reset({
      ssn: this.ssnDefaultValue,
      country: this.countryDefaultValue
    });
  }

  isFormValid(): boolean {
    let isValid: boolean = false;
    if (this.searchPersonForm.valid) {
      isValid = true;
      this.errorId = undefined;
    } else {
      if (!this.searchPersonForm.get('ssn').valid) {
        this.errorId = 'SSN_INVALID';
      } else {
        this.errorId = 'COUNTRY_INVALID';
      }
    }
    return isValid;
  }

  setSearchPersonForm(searchPersonForm: FormGroup) {
    this.searchPersonForm = searchPersonForm;
  }

  get ssn(): number {
    return Number.parseInt(this.searchPersonForm.get('ssn').value);
  }

  get country(): string {
    return this.searchPersonForm.get('country').value;
  }
}
