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
  person: Osoba | undefined;
  BookFormComponent: any;

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
      this.book = this.bookService.getBook(Number(this.id));
    }
  }
}
