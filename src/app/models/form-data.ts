import { FieldData } from './field-data';
import { ButtonData } from './button-data';

export interface FormData {
  fields: FieldData[];
  buttons: ButtonData[];
  errorList: {[key: string]: string}
}
