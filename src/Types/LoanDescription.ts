import { Ksiazka } from './Ksiazka';
import { Osoba } from './Osoba';
import { Wypozyczenie } from './Wypozyczenie';

export interface LoanDescription {
  Loan: Wypozyczenie;
  Person: Osoba;
  Book: Ksiazka;
}
