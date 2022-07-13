import { Ksiazka } from 'src/Types/Ksiazka';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/Books/book.service';

@Component({
  selector: 'app-ksiazka',
  templateUrl: './ksiazka.component.html',
  styleUrls: ['./ksiazka.component.css'],
})
export class KsiazkaComponent implements OnInit {
  constructor(private booksService: BookService) {}
  books: Array<Ksiazka> = [];
  searchedValue: string = '';

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.booksService
      .getAllBooks()
      .subscribe((data) => (this.books = data.slice()));
  }

  booksSearch() {
    this.searchedValue
      ? this.booksService
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
    this.booksService.addBook(toAdd);
  }
  deleteBook(id: number) {
    this.booksService.deleteBook(id);
  }
}
