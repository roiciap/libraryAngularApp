import { LoanDescription } from 'src/Types/LoanDescription';
import { LoansService } from './../../services/Loans/loans.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/Books/book.service';
import { Ksiazka } from 'src/Types/Ksiazka';
import { Osoba } from 'src/Types/Osoba';

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

  constructor(
    private router: Router,
    private loansService: LoansService,
    private Activatedroute: ActivatedRoute,
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
    this.bookService
      .getBook(Number(this.id))
      .subscribe((data) => (this.book = data));
    this.loansService
      .getLoansDetails({
        returned: false,
        bookId: this.book?.id,
      })
      .subscribe((data) => (this.loans = data));

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
      .subscribe(
        (data) =>
          (this.toPayForBook = data.reduce(
            (sum, val) => sum + val.Payment.kwota,
            0
          ))
      );
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
  bookColor = 'color: blue';
  checkToPay(): void {
    if (this.toPayForBook == 0) {
      this.bookColor = 'color: green';
    } else {
      this.bookColor = 'color: red';
    }
  }
}
