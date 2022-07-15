import { PaymentService } from './../Payment/payment.service';
import { PersonService } from './../person.service';
import { BookService } from './../Books/book.service';
import { Wypozyczenie } from './../../../Types/Wypozyczenie';
import { map, Observable } from 'rxjs';
import { LoansStoreService } from './loans-store.service';
import { Injectable } from '@angular/core';
import { Osoba } from 'src/Types/Osoba';
import { Ksiazka } from 'src/Types/Ksiazka';
import { LoanDescription } from 'src/Types/LoanDescription';
import { Oplata } from 'src/Types/Oplata';

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
    ///find higest id and add 1 to specify current id
    this.getAllLoans()
      .pipe(
        map(
          (val) =>
            val.reduce((max, loan) => (loan.id > max ? loan.id : max), 0) + 1
        )
      )
      .subscribe((data) => (newId = data))
      .unsubscribe();
    this.paymentService.addPayment({
      id: -1,
      idWypozyczenia: newId,
      kwota: 0,
      oplacone: false,
    });

    this.loansStore.addLoan({
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
    return true;
  }

  returnBook(loanId: number, returnDate: Date = new Date()): boolean {
    returnDate.setDate(returnDate.getDate() + 5); ////////Adds 5 days to return Date - test purpose only - to delete

    let returned: Wypozyczenie | undefined;
    this.getAllLoans()
      .pipe(map((val) => val.find((searched) => searched.id === loanId)))
      .subscribe((data) => (returned = data))
      .unsubscribe();
    if (!returned) return false;
    if (returned.dataOddania) return false;
    if (returned.dataPrzyjecia > returnDate) return false;
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
      personId?: number;
      bookId?: number;
      paid?: boolean;
      loanId?: number;
    },
    search?: { personName?: string }
  ): Observable<Array<LoanDescription>> {
    //pobieranie osob oraz ksiazek
    let LoansToPipe = this.loansStore.getLoans();
    let books: Array<Ksiazka> = [];
    let people: Array<Osoba> = [];
    let payments: Array<Oplata> = [];
    this.booksService.getAllBooks().subscribe((data) => (books = data));

    if (search?.personName !== undefined)
      this.personService
        .getAllPersons()
        .pipe(
          map((val) =>
            val.filter((person) => {
              if (search?.personName)
                return (person.imie + ' ' + person.nazwisko).includes(
                  search?.personName
                );
              return true;
            })
          )
        )
        .subscribe((data) => (people = data));
    else
      this.personService.getAllPersons().subscribe((data) => (people = data));

    this.paymentService.getAllPayments().subscribe((data) => (payments = data));
    /////loan filters
    if (settings?.bookId)
      LoansToPipe = LoansToPipe.pipe(
        map((val) => val.filter((loan) => loan.idKsiazka === settings.bookId))
      );
    if (settings?.personId) {
      LoansToPipe = LoansToPipe.pipe(
        map((val) => val.filter((loan) => loan.idOsoba === settings.personId))
      );
    }
    if (settings?.loanId) {
      LoansToPipe = LoansToPipe.pipe(
        map((val) => val.filter((loan) => loan.id === settings.loanId))
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
    ////Mapping to LoanDetails (refreshPayments to make sure that every loan has existing payment object)
    this.refreshPayments();

    return LoansToPipe.pipe(
      map((val) =>
        val
          .map((record) => {
            return {
              Loan: record,
              Person: people.find((val) => val.id === record.idOsoba)!,
              Book: books.find((val) => val.id === record.idKsiazka)!,
              Payment: payments.find(
                (val) => val.idWypozyczenia === record.id
              )!,
            };
          })
          .filter((loan) => {
            if (settings?.paid != undefined) {
              return loan.Payment.oplacone === settings.paid;
            }
            return true;
          })
      )
    );
    ///details filter
  }
  ////////////////////////////////////////////////////////Payment
  refreshPayments(target?: {
    personId?: number;
    bookId?: number;
    loanId?: number;
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
      let id: number = -1;
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

  payLoan(loanId: number) {
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
}
