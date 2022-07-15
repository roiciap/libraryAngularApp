import { BookService } from 'src/app/services/books/book.service';
import { LoansService } from './../../services/Loans/loans.service';
import { LoanDescription } from 'src/Types/LoanDescription';
import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Osoba } from 'src/Types/Osoba';
import { Ksiazka } from 'src/Types/Ksiazka';

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

  constructor(
    private router: Router,
    private Activatedroute: ActivatedRoute,
    private personService: PersonService,
    private loansService: LoansService,
    private bookService: BookService
  ) {}
  ngOnInit(): void {
    this.Activatedroute.paramMap.subscribe(
      (data) => (this.id = data.get('id')?.trim() || '')
    );
    if (Number.isNaN(Number(this.id))) {
    } else {
      this.loadData();
    }
  }
  loadData() {
    this.personService
      .getPerson(Number(this.id))
      .subscribe((data) => (this.person = data));
    if (this.person) {
      this.loansService
        .getLoansDetails({ returned: true, personId: this.person.id })
        .subscribe((data) => (this.loansHistory = data));
      this.loansService
        .getLoansDetails({ returned: false, personId: this.person.id })
        .subscribe((data) => (this.activeLoans = data));
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

  searchBooks(searched: string) {
    this.bookService
      .getSearchedBooks(searched)
      .subscribe((data) => (this.books = data));
  }

  returnBook(loanID: number) {
    this.loansService.returnBook(loanID);
  }

  switchContent() {
    this.showAddContent = !this.showAddContent;
  }

  loanBook(bookId: number) {
    if (this.person)
      this.loansService.addLoan({ idKsiazka: bookId, idOsoba: this.person.id });
  }

  payForLoan(loanId: number) {
    this.loansService.payLoan(loanId);
  }

  bookColor = 'p-button-outlined p-button-help';
  checkToPay(): void {
    if (this.toPaySum == 0) {
      this.bookColor = 'p-button-outlined p-button-success';
    } else {
      this.bookColor = ' p-button-danger';
    }
  }
  showWarning = false;
  checkWarning(): void {
    if (this.activeLoans.length === 0) {
      this.showWarning = !this.showWarning;
    }
  }
}
