import { LoanDescription } from './../../../Types/LoanDescription';
import { PersonService } from './../person.service';
import { BookService } from './../Books/book.service';
import { Wypozyczenie } from './../../../Types/Wypozyczenie';
import { map, Observable } from 'rxjs';
import { LoansStoreService } from './loans-store.service';
import { Injectable } from '@angular/core';
import { Osoba } from 'src/Types/Osoba';
import { Ksiazka } from 'src/Types/Ksiazka';

@Injectable({
  providedIn: 'root',
})
export class LoansService {
  constructor(
    private loansStore: LoansStoreService,
    private booksService: BookService,
    private personService: PersonService
  ) {}

  getAllLoans(): Observable<Array<Wypozyczenie>> {
    return this.loansStore.getLoans();
  }

  getPersonLoans(osobaId: number): Observable<Array<Wypozyczenie>> {
    return this.getAllLoans().pipe(
      map((val) => val.filter((loan) => loan.idOsoba === osobaId))
    );
  }

  getBookLoans(bookId: number): Observable<Array<Wypozyczenie>> {
    return this.getAllLoans().pipe(
      map((val) => val.filter((loan) => loan.idKsiazka === bookId))
    );
  }

  // id powinny być strigami
  addLoans(newLoan: { idKsiazka: number; idOsoba: number }): boolean {
    const book = this.booksService.getBook(newLoan.idKsiazka);
    const person = this.personService.getPerson(newLoan.idOsoba);
    if (!book || !person) return false;

    ///sprawdz czy jest dostepna
    let storage: number = 0;
    this.getBookLoans(newLoan.idKsiazka)
      .pipe(
        map((val) => val.reduce((sum, it) => sum + (it.dataOddania ? 0 : 1), 0))
      )
      .subscribe((data) => (storage = book.dostepnosc - data))
      .unsubscribe();
    if (storage < 1) return false;

    let newId: number = -2;
    this.getAllLoans()
      .pipe(
        map(
          (val) =>
            val.reduce((max, loan) => (loan.id > max ? loan.id : max), 0) + 1
        )
      )
      .subscribe((data) => (newId = data))
      .unsubscribe();

    this.loansStore.addLoan({
      id: newId,
      dataPrzyjecia: new Date(),
      dataOddania: null,
      idKsiazka: newLoan.idKsiazka,
      idOsoba: newLoan.idOsoba,
    });
    console.log(newId);
    return true;
  }

  returnBook(loanId: number, when: Date = new Date()): boolean {
    let returned: Wypozyczenie | undefined;
    this.getAllLoans()
      .pipe(map((val) => val.find((searched) => searched.id === loanId)))
      .subscribe((data) => (returned = data))
      .unsubscribe();
    if (!returned) return false;
    this.loansStore.updateLoan({ ...returned, dataOddania: when });
    return true;
  }

  getLoansDetails(): Observable<Array<LoanDescription>> {
    //pobieranie osob oraz ksiazek
    let books: Array<Ksiazka> = [];
    let people: Array<Osoba> = [];
    this.booksService.getAllBooks().subscribe((data) => (books = data));
    this.personService.getAllPersons().subscribe((data) => (people = data));
    return this.loansStore.getLoans().pipe(
      map((val) =>
        val.map((record) => {
          return {
            Loan: record,
            Person: people.find((val) => val.id === record.idOsoba)!,
            Book: books.find((val) => val.id === record.idKsiazka)!,
          };
        })
      )
    );
  }
}
