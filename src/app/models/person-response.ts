import { Person } from './person';

export interface PersonResponse {
  successList: Person[],
  errorList: number[]
}
