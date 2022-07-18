import { LoanDescription } from 'src/Types/LoanDescription';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/books/book.service';
import { Ksiazka } from 'src/Types/Ksiazka';
import { LoansService } from 'src/app/services/loans/loans.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  id: string = '';
  book: Ksiazka | undefined;
  loans: Array<LoanDescription> = [];
  showSearch: boolean = true;
  showEdit: boolean = true;
  editAutor: string = '';
  editNazwa: string = '';
  editRok: number = 0;
  editDostepnosc: number = 0;
  BookFormComponent: any;
  serach: string = '';

  paidForBook: number = 0;
  toPayForBook: number = 0;

  constructor(
    private readonly router: Router,
    private readonly loansService: LoansService,
    private readonly Activatedroute: ActivatedRoute,
    private readonly bookService: BookService
  ) {}
  toggleSearch() {
    this.showSearch = !this.showSearch;
    this.showEdit = true;
  }

  toggleEditBar() {
    this.showEdit = !this.showEdit;
    this.showSearch = true;
    if (this.book) {
      this.editAutor = this.book.autor;
      this.editDostepnosc = this.book.dostepnosc;
      this.editNazwa = this.book.nazwa;
      this.editRok = this.book.rokWydania;
    }
  }

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
    this.bookService
      .getBook(Number(this.id))
      .subscribe((data) => (this.book = data));
    // this.loansService
    //   .getLoansDetails({
    //     returned: false,
    //     bookId: this.book?.id,
    //   })
    //   .subscribe((data) => (this.loans = data));

    //obliczanie lacznej zarobionej kwoty na ksiazce
    this.loansService
      .getLoansDetails({ paid: true, bookId: this.book?.id })
      .subscribe(
        (data) =>
          (this.paidForBook = data.reduce(
            (sum, val) => sum + val.Payment.kwota,
            0
          ))
      );
    //obliczanie lacznej kwoty do zaplacenia za ksiazke przez czytelnikow
    this.loansService
      .getLoansDetails({ paid: false, bookId: this.book?.id })
      .subscribe((data) => {
        this.loans = data;
        this.toPayForBook = data.reduce(
          (sum, val) => sum + val.Payment.kwota,
          0
        );
      });
  }

  searchPeople() {
    this.loansService
      .getLoansDetails(
        {
          returned: false,
          bookId: this.book?.id,
        },
        { personName: this.serach }
      )
      .subscribe((data) => (this.loans = data));
  }

  updateBook() {
    if (this.book !== undefined)
      this.bookService.updateBook({
        id: this.book.id,
        nazwa: this.editNazwa,
        autor: this.editAutor,
        rokWydania: this.editRok,
        dostepnosc: this.editDostepnosc,
      });
  }

  checkToPay(): string {
    if (this.toPayForBook == 0) {
      return 'color: green';
    } else {
      return 'color: red';
    }
  }

  returnBook(loanID: number) {
    this.loansService.returnBook(loanID);
  }
}
