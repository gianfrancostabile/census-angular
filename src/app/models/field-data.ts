import { OptionData } from './option-data';
import { ValidatorFn } from '@angular/forms';

export interface FieldData {
  name: string;
  type: string;
  label?: string;
  value?: string | number;
  options?: OptionData[];
  validators?: ValidatorFn[];
}
