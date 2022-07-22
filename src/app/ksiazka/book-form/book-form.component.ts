import { map, Observable, of } from 'rxjs';
import { LoanDescription } from 'src/Types/LoanDescription';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/books/book.service';
import { Ksiazka } from 'src/models/Ksiazka';
import { LoansService } from '../../services/loans/loans.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  id: string = '';
  book$: Observable<Ksiazka> = of();
  loans$: Observable<Array<LoanDescription>> = of([]);
  showSearch: boolean = true;
  showEdit: boolean = true;
  editAutor: string = '';
  editNazwa: string = '';
  editRok: number = 0;
  editDostepnosc: number = 0;
  BookFormComponent: any;
  serach: string = '';

  paidForBook$: Observable<number> = of(0);
  toPayForBook$: Observable<number> = of(0);

  constructor(
    private readonly loansService: LoansService,
    private readonly Activatedroute: ActivatedRoute,
    private readonly bookService: BookService
  ) {}
  ngOnInit(): void {
    let url: string = '';
    this.Activatedroute.paramMap.subscribe(
      (data) => (url = data.get('id') || '')
    );
    const strings: string[] = url.split('+');
    if (strings.length > 0) {
      this.id = strings.pop()!;
    }
    if (this.id) {
      this.loadData();
    }
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    this.showEdit = true;
  }

  toggleEditBar(): void {
    this.showEdit = !this.showEdit;
    this.showSearch = true;
    let book: Ksiazka | undefined;
    this.book$.subscribe((data) => (book = data));
    if (book) {
      this.editAutor = book.autor;
      this.editDostepnosc = book.dostepnosc;
      this.editNazwa = book.nazwa;
      this.editRok = book.rokWydania;
    }
  }

  loadData(): void {
    this.book$ = this.bookService.getBook(this.id).pipe(
      map((val) => {
        console.log(val);
        return val;
      })
    );
    //obliczanie lacznej zarobionej kwoty na ksiazce
    this.toPayForBook$ = this.loansService
      .getLoansDetails({ paid: false, bookId: this.id })
      .pipe(map((val) => val.reduce((sum, x) => sum + x.Payment.kwota, 0)));
    //obliczanie lacznej kwoty do zaplacenia za ksiazke przez czytelnikow
    this.paidForBook$ = this.loansService
      .getLoansDetails({ paid: true, bookId: this.id })
      .pipe(map((val) => val.reduce((sum, x) => sum + x.Payment.kwota, 0)));
    this.loans$ = this.loansService.getLoansDetails({
      paid: false,
      bookId: this.id,
    });
  }

  searchPeople(): void {
    this.loans$ = this.loansService.getLoansDetails(
      {
        returned: false,
        bookId: this.id,
      },
      { personName: this.serach }
    );
  }

  updateBook(): void {
    this.bookService.updateBook({
      id: this.id,
      nazwa: this.editNazwa,
      autor: this.editAutor,
      rokWydania: this.editRok,
      dostepnosc: this.editDostepnosc,
    });
  }

  checkToPay(green: boolean): string {
    if (green) {
      return 'color: green';
    } else {
      return 'color: red';
    }
  }

  returnBook(loanID: string): void {
    this.loansService.returnBook(loanID);
  }
}
