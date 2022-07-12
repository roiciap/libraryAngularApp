import { BookService } from './../../services/book.service';
import { Component, Input, OnInit } from '@angular/core';
import { Ksiazka } from 'src/Types/Ksiazka';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  @Input()
  book: Ksiazka = {
    id: -1,
    nazwa: '',
    autor: '',
    rokWydania: new Date().getFullYear(),
    dostepnosc: 0,
  };
  constructor(private _bookService: BookService) {}
  ngOnInit(): void {
    this.book = { ...this.book };
  }
  submit() {
    this.book.id < 0
      ? this._bookService.addBook(this.book)
      : this._bookService.updateBook(this.book);
  }
}
