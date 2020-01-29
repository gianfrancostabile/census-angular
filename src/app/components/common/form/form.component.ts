import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormData } from './../../../models/form-data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  private formGroup: FormGroup;
  private errorMessage: string;
  
  @Input() formData: FormData;
  @Input() errorId: string;
  @Input() isLoading: boolean = undefined;
  @Output() form: EventEmitter<FormGroup> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    const fieldsData = {};
    this.formData.fields.forEach(item => fieldsData[item.name] = new FormControl(item.value, item.validators));
    this.setFormGroup(new FormGroup(fieldsData));
  }
  
  ngOnChanges(changes) {
    if (changes && changes.errorId) {
      this.errorMessage = this.formData.errorList[changes.errorId.currentValue];
    }
  }

  setFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
    this.form.emit(this.formGroup);
  }
}
