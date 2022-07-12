import { Ksiazka } from 'src/Types/Ksiazka';
import { BookService } from './../services/book.service';
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
    this.books = this._booksService.getAllBooks();
  }

  booksSearch(searched: string) {
    this.books = this._booksService.getSearchedBooks(searched);
  }

  addBook(toAdd: {
    nazwa: string;
    autor: string;
    rokWydania: number;
    dostepnosc: number;
  }) {
    this.books = this._booksService.addBook(toAdd);
  }
}
