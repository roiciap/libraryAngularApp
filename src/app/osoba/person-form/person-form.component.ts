import { BookService } from 'src/app/services/Books/book.service';
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
      this.person = this.personService.getPerson(Number(this.id));
      this.loadData();
    }
    console.log(this.activeLoans);
    console.log(this.loansHistory);
  }
  loadData() {
    if (this.person) {
      this.loansService
        .getLoansDetails({ returned: true, personId: this.person.id })
        .subscribe((data) => (this.loansHistory = data.slice()));
      this.loansService
        .getLoansDetails({ returned: false, personId: this.person.id })
        .subscribe((data) => (this.activeLoans = data.slice()));
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
}
