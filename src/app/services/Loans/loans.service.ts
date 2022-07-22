import {
  from,
  map,
  Observable,
  mergeMap,
  toArray,
  forkJoin,
  filter,
  zip,
  combineLatest,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Ksiazka } from 'src/models/Ksiazka';

import { PersonService } from '../persons/person.service';
import { BookService } from '../books/book.service';
import { PaymentService } from '../payment/payment.service';
import { LoansStoreService } from 'src/app/services/loans/loans-store.service';
import { Wypozyczenie } from 'src/models/Wypozyczenie';
import { Osoba } from 'src/models/Osoba';
import { LoanDescription } from 'src/models/LoanDescription';
import { Oplata } from 'src/models/Oplata';

@Injectable({
  providedIn: 'root',
})
export class LoansService {
  constructor(
    private loansStore: LoansStoreService,
    private booksService: BookService,
    private personService: PersonService,
    private paymentService: PaymentService
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

  getPersonLoans(osobaId: string): Observable<Array<Wypozyczenie>> {
    return this.getAllLoans().pipe(
      map((val) => val.filter((loan) => loan.idOsoba === osobaId))
    );
  }

  getBookLoans(bookId: string): Observable<Array<Wypozyczenie>> {
    return this.getAllLoans().pipe(
      map((val) => val.filter((loan) => loan.idKsiazka === bookId))
    );
  }

  addLoan(newLoan: {
    idKsiazka: string;
    idOsoba: string;
  }): Observable<Wypozyczenie> {
    let book: Ksiazka | undefined;
    let person: Osoba | undefined;
    this.booksService
      .getBook(newLoan.idKsiazka)
      .subscribe((data) => (book = data));
    this.personService
      .getPerson(newLoan.idOsoba)
      .subscribe((data) => (person = data));
    if (!book || !person) throw new Error('person or book doesnt exist');
    if (book.dostepnosc < 1) throw new Error('book isnt avalible');

    let newId: string = '';
    newId = Math.random().toString(36).substring(2, 9);
    this.paymentService.addPayment({
      id: '',
      idWypozyczenia: newId,
      kwota: 0,
      oplacone: false,
    });

    const toReturn = this.loansStore.addLoan({
      id: newId,
      dataPrzyjecia: new Date(),
      dataOddania: null,
      idKsiazka: newLoan.idKsiazka,
      idOsoba: newLoan.idOsoba,
    });

    this.booksService.updateBook({ ...book, dostepnosc: book.dostepnosc - 1 });
    this.refreshPayments({ loanId: newId });
    this.paymentService.refresh();
    this.loansStore.refresh();
    return toReturn;
  }

  returnBook(loanId: string, returnDate: Date = new Date()): boolean {
    returnDate.setDate(returnDate.getDate() + 5); ////////Adds 5 days to return Date - test purpose only - to delete

    let returned: Wypozyczenie | undefined;
    this.getAllLoans()
      .pipe(map((val) => val.find((searched) => searched.id === loanId)))
      .subscribe((data) => (returned = data))
      .unsubscribe();
    if (!returned) return false;
    if (returned.dataOddania) return false;
    if (returned.dataPrzyjecia.getDate() > returnDate.getDate()) return false;
    this.loansStore.updateLoan({ ...returned, dataOddania: returnDate });
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
    this.refreshPayments({ loanId }); //{bookId:returned?.idKsiazka,personId:returned?.idOsoba}
    this.paymentService.refresh();
    this.loansStore.refresh();

    return true;
  }

  getLoansDetails(
    settings?: {
      returned?: boolean;
      personId?: string;
      bookId?: string;
      paid?: boolean;
      loanId?: string;
    },
    search?: { personName: string }
  ): Observable<Array<LoanDescription>> {
    this.refreshPayments();
    let loans$ = this.loansStore.getLoans();
    let books$ = this.booksService.getAllBooks();
    let people$ = this.personService.getAllPersons();
    let payments$ = this.paymentService.getAllPayments();
    return combineLatest([loans$, books$, people$, payments$]).pipe(
      map(([loans, books, people, payments]) => {
        return loans.map((loan) => {
          return {
            Loan: loan,
            Person: people.find((person) => person.id === loan.idOsoba),
            Book: books.find((book) => book.id === loan.idKsiazka),
            Payment: payments.find(
              (payment) => payment.idWypozyczenia === loan.id
            ),
          } as LoanDescription;
        });
      }),
      map((val) =>
        val.filter((l) => {
          return (
            l.Person != undefined &&
            l.Payment != undefined &&
            l.Book != undefined
          );
        })
      ),
      map((val) =>
        val.filter((loan) => {
          let filterResult = true;
          if (settings != undefined) {
            if (settings.bookId != undefined) {
              filterResult = loan.Book.id === settings.bookId;
            }
            if (settings.personId != undefined && filterResult) {
              filterResult =
                loan.Person.id === settings.personId && filterResult;
            }
            if (settings.paid != undefined && filterResult) {
              filterResult =
                settings.paid === loan.Payment.oplacone && filterResult;
            }
            if (settings.loanId != undefined && filterResult) {
              filterResult = loan.Loan.id === settings.loanId && filterResult;
            }
            if (settings.returned != undefined && filterResult) {
              filterResult =
                settings.returned === (loan.Loan.dataOddania != null) &&
                filterResult;
            }
          }
          if (search != undefined && filterResult) {
            filterResult =
              filterResult &&
              [loan.Person.imie, loan.Person.nazwisko]
                .join(' ')
                .includes(search.personName);
          }
          return filterResult;
        })
      )
    );
  }

  deletePerson(id: string): void {
    let loanArr: Array<LoanDescription> = [];
    this.getLoansDetails({ personId: id })
      .subscribe((data) => (loanArr = data))
      .unsubscribe();
    loanArr.forEach((loan) => {
      this.returnBook(loan.Loan.id);
      this.payLoan(loan.Loan.id);
    });
    this.personService.deletePerson(id);
  }

  ////////////////////////////////////////////////////////Payment
  refreshPayments(target?: {
    personId?: string;
    bookId?: string;
    loanId?: string;
  }): void {
    let loansTarget: Array<Wypozyczenie> = [];
    this.getAllLoans().subscribe((data) => (loansTarget = data));
    ///ID filters
    loansTarget = loansTarget.filter((val) => {
      if (target?.personId !== undefined && target.personId !== val.idOsoba)
        return false;
      if (target?.bookId !== undefined && target.bookId !== val.idKsiazka)
        return false;
      if (target?.loanId !== undefined && target.loanId !== val.id)
        return false;
      return !this.paymentService.checkPaidLoan(val.id);
    });
    //refresh payment of every target
    loansTarget.forEach((loan) => {
      let id: string = '';
      const returnDate = loan.dataOddania ? loan.dataOddania : new Date();
      const kwota = returnDate.getDate() - loan.dataPrzyjecia.getDate();
      let payment: Oplata | undefined;
      this.paymentService
        .getPayment(loan.id)
        .subscribe((data) => (payment = data));
      if (!payment) {
        payment = {
          id,
          idWypozyczenia: loan.id,
          oplacone: false,
          kwota,
        };
      }
      if (loan.dataOddania != null && kwota === 0) {
        payment.oplacone = true;
      }
      this.paymentService.update({ ...payment, kwota });
    });
    //refresh observables
    this.loansStore.refresh();
  }

  payLoan(loanId: string): void {
    let loan: Wypozyczenie | undefined;
    this.loansStore.getLoan(loanId).subscribe((data) => (loan = data));
    if (loan == undefined) return;
    if (loan.dataOddania != null) {
      let payment: Oplata | undefined;
      this.paymentService
        .getPayment(loan.id)
        .subscribe((data) => (payment = data));
      if (payment) {
        if (payment.oplacone == true) return;
        payment.oplacone = true;
        this.paymentService.update(payment);
      }
    }
    this.refreshPayments({ loanId: loanId });
    this.loansStore.refresh();
  }
  ////////////////////////////////////////////////////////

  getAwaitingPaymentUsersInfo(): Observable<Array<userPaymentInfo>> {
    return this.getLoansDetails({ paid: false }).pipe(
      map((val) => {
        let people: Set<Osoba> = new Set<Osoba>(val.map((loan) => loan.Person));
        let newArr: Array<userPaymentInfo> = [];
        people.forEach((person) => {
          let unreturnedLoans = val.filter((loan) => loan.Person === person);
          let costSum = unreturnedLoans.reduce(
            (count, loan) => count + loan.Payment.kwota,
            0
          );
          newArr.push({
            personId: person.id,
            personName: person.imie,
            personSurname: person.nazwisko,
            toPay: costSum,
            booksAmount: unreturnedLoans.length,
          });
        });
        return newArr;
      })
    );
  }
}
export type userPaymentInfo = {
  personId: string;
  personName: string;
  personSurname: string;
  toPay: number;
  booksAmount: number;
};
