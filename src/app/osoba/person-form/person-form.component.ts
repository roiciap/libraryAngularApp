import { BookService } from 'src/app/services/books/book.service';
import { LoanDescription } from 'src/Types/LoanDescription';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Osoba } from 'src/Types/Osoba';
import { Ksiazka } from 'src/Types/Ksiazka';
import { PersonService } from 'src/app/services/persons/person.service';
import { LoansService } from 'src/app/services/loans/loans.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
})
export class PersonFormComponent implements OnInit {
  id: string = '';
  person: Osoba | undefined;
  activeLoans: Array<LoanDescription> = [];
  loansHistory: Array<LoanDescription> = [];
  showAddContent: boolean = false;
  books: Array<Ksiazka> = [];
  paidSum: number = 0;
  toPaySum: number = 0;
  searchedValue: string = '';
  showWarning = false;
  bookColor = 'p-button-outlined p-button-help';
  constructor(
    private Activatedroute: ActivatedRoute,
    private personService: PersonService,
    private loansService: LoansService,
    private bookService: BookService
  ) {}
  ngOnInit(): void {
    this.Activatedroute.paramMap.subscribe(
      (data) => (this.id = data.get('id')?.trim() || '')
    );
    if (this.id) {
      this.loadData();
    }
  }
  loadData(): void {
    this.personService
      .getPerson(this.id)
      .subscribe((data) => (this.person = data));
    if (this.person) {
      //oddane ksiazki
      this.loansService
        .getLoansDetails({ returned: true, personId: this.person.id })
        .subscribe((data) => {
          this.loansHistory = data.sort((a, b) => {
            if (a.Payment.oplacone == false && b.Payment.oplacone == true)
              return -1;
            return 1;
          });
        });
      //nieoddane ksiazki
      this.loansService
        .getLoansDetails({ returned: false, personId: this.person.id })
        .subscribe((data) => {
          this.activeLoans = data;
        });
      //zaplacone
      this.loansService
        .getLoansDetails({ paid: true, personId: this.person.id })
        .subscribe(
          (data) =>
            (this.paidSum = data.reduce(
              (sum, val) => sum + val.Payment.kwota,
              0
            ))
        );

      //do zaplaty
      this.loansService
        .getLoansDetails({ paid: false, personId: this.person.id })
        .subscribe(
          (data) =>
            (this.toPaySum = data.reduce(
              (sum, val) => sum + val.Payment.kwota,
              0
            ))
        );
    }
    this.bookService.getAllBooks().subscribe((data) => (this.books = data));
  }

  searchBooks(searched: string): void {
    this.bookService
      .getSearchedBooks(searched)
      .subscribe((data) => (this.books = data));
  }

  returnBook(loanID: string): void {
    this.loansService.returnBook(loanID);
  }

  switchContent(): void {
    this.showAddContent = !this.showAddContent;
  }

  loanBook(bookId: string): void {
    if (this.person)
      this.loansService.addLoan({ idKsiazka: bookId, idOsoba: this.person.id });
  }

  payForLoan(loanId: string): void {
    this.loansService.payLoan(loanId);
  }

  checkToPay(): void {
    if (this.toPaySum == 0) {
      this.bookColor = 'p-button-outlined p-button-success';
    } else {
      this.bookColor = ' p-button-danger';
    }
  }
  checkWarning(): void {
    if (this.activeLoans.length === 0) {
      this.showWarning = !this.showWarning;
    }
  }
}
