import { Ksiazka } from './Ksiazka';
import { Oplata } from './Oplata';
import { Osoba } from './Osoba';
import { Wypozyczenie } from './Wypozyczenie';

export interface LoanDescription {
  Loan: Wypozyczenie;
  Person: Osoba;
  Book: Ksiazka;
  Payment: Oplata;
}
