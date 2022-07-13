import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/Books/book.service';
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

  done: boolean = false;

  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.book = { ...this.book };
  }
  submit() {
    this.done =
      this.book.id < 0
        ? this.bookService.addBook(this.book)
        : this.bookService.updateBook(this.book);
  }
}
