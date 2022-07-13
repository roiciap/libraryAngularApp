import { Ksiazka } from 'src/Types/Ksiazka';
import { BookService } from './../services/Books/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ksiazka',
  templateUrl: './ksiazka.component.html',
  styleUrls: ['./ksiazka.component.css'],
})
export class KsiazkaComponent implements OnInit {
  constructor(private _booksService: BookService) {}
  books: Array<Ksiazka> = [];
  searchedValue: string = '';

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this._booksService
      .getAllBooks()
      .subscribe((data) => (this.books = data.slice()));
  }

  booksSearch() {
    this.searchedValue
      ? this._booksService
          .getSearchedBooks(this.searchedValue)
          .subscribe((data) => (this.books = data.slice()))
      : this.getAllBooks();
  }

  addBook(toAdd: {
    nazwa: string;
    autor: string;
    rokWydania: number;
    dostepnosc: number;
  }) {
    this._booksService.addBook(toAdd);
  }
  deleteBook(id: number) {
    this._booksService.deleteBook(id);
  }
}
