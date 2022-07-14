import { PersonService } from './../person.service';
import { BookService } from './../Books/book.service';
import { Wypozyczenie } from './../../../Types/Wypozyczenie';
import { map, Observable } from 'rxjs';
import { LoansStoreService } from './loans-store.service';
import { Injectable } from '@angular/core';
import { Osoba } from 'src/Types/Osoba';
import { Ksiazka } from 'src/Types/Ksiazka';
import { LoanDescription } from 'src/Types/LoanDescription';

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

  getAllReturnedLoans(): Observable<Array<Wypozyczenie>> {
    return this.loansStore
      .getLoans()
      .pipe(map((val) => val.filter((loan) => loan.dataOddania)));
  }
  getAllUnreturnedLoans(): Observable<Array<Wypozyczenie>> {
    return this.loansStore
      .getLoans()
      .pipe(map((val) => val.filter((loan) => loan.dataOddania == null)));
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
  addLoan(newLoan: { idKsiazka: number; idOsoba: number }): boolean {
    let book: Ksiazka | undefined;
    let person: Osoba | undefined;
    this.booksService
      .getBook(newLoan.idKsiazka)
      .subscribe((data) => (book = data));
    this.personService
      .getPerson(newLoan.idOsoba)
      .subscribe((data) => (person = data));
    if (!book || !person) return false;

    if (book.dostepnosc < 1) return false;

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

    this.booksService.updateBook({ ...book, dostepnosc: book.dostepnosc - 1 });
    return true;
  }

  returnBook(loanId: number, when: Date = new Date()): boolean {
    let returned: Wypozyczenie | undefined;
    this.getAllLoans()
      .pipe(map((val) => val.find((searched) => searched.id === loanId)))
      .subscribe((data) => (returned = data))
      .unsubscribe();
    if (!returned) return false;
    if (returned.dataOddania) return false;
    this.loansStore.updateLoan({ ...returned, dataOddania: when });
    let book: Ksiazka | undefined;
    this.booksService
      .getBook(returned.idKsiazka)
      .subscribe((data) => (book = data));

    if (book) {
      this.booksService.updateBook({
        ...book,
        dostepnosc: book.dostepnosc + 1,
      });
    }
    return true;
  }

  getLoansDetails(
    settings?: {
      returned?: boolean;
      personId?: number;
      bookId?: number;
    },
    search?: { personName?: string }
  ): Observable<Array<LoanDescription>> {
    //pobieranie osob oraz ksiazek
    let books: Array<Ksiazka> = [];
    let people: Array<Osoba> = [];
    this.booksService.getAllBooks().subscribe((data) => (books = data));
    this.personService.getAllPersons().subscribe((data) => (people = data));

    let LoansToPipe = this.loansStore.getLoans();
    if (settings?.bookId)
      LoansToPipe = LoansToPipe.pipe(
        map((val) => val.filter((loan) => loan.idKsiazka === settings.bookId))
      );
    if (settings?.personId) {
      console.log('dla osoby o id' + settings.personId);
      LoansToPipe = LoansToPipe.pipe(
        map((val) => val.filter((loan) => loan.idOsoba === settings.personId))
      );
    }

    if (settings?.returned != undefined)
      LoansToPipe = LoansToPipe.pipe(
        map((val) =>
          val.filter((loan) => {
            return settings?.returned
              ? loan.dataOddania !== null
              : loan.dataOddania == null;
          })
        )
      );
    ////Mapping to LoanDetails
    let LoansDetails = LoansToPipe.pipe(
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
    if (search?.personName !== undefined)
      LoansDetails = LoansDetails.pipe(
        map((val) =>
          val.filter((LD) =>
            (LD.Person.imie + ' ' + LD.Person.nazwisko)
              .toLowerCase()
              .includes(search.personName?.toLowerCase()!)
          )
        )
      );
    return LoansDetails;
  }
}
