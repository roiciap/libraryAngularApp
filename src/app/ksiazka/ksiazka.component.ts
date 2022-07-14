import { StringUtilsService } from './../services/utils/string-utils.service';
import { Ksiazka } from './../../Types/Ksiazka';
import { BookService } from '../services/Books/book.service';
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

  nazwaInput: string = '';
  autorInput: string = '';
  rokInput: number = 2020;
  dostepnoscInput: number = 1;

  showSearch: boolean = true;
  showAdd: boolean = true;
  toggleSearch() {
    this.showSearch = !this.showSearch;
    this.showAdd = true;
  }

  toggleAddBar() {
    this.showAdd = !this.showAdd;
    console.log(this.showAdd);
    this.showSearch = true;
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this._booksService.getAllBooks().subscribe((data) => {
      console.log(data);
      this.books = data.slice();
    });
  }

  booksSearch(searched: string) {
    this.searchedValue
      ? this._booksService
          .getSearchedBooks(this.searchedValue)
          .subscribe((data) => (this.books = data.slice()))
      : this.getAllBooks();
  }

  // addBook(toAdd: {
  //   nazwa: string;
  //   autor: string;
  //   rokWydania: number;
  //   dostepnosc: number;
  // }) {
  //   this._booksService.addBook(toAdd);
  // }
  addBook(): void {
    this._booksService.addBook({
      nazwa: this.nazwaInput,
      autor: this.autorInput,
      rokWydania: this.rokInput,
      dostepnosc: this.dostepnoscInput,
    });
    this.nazwaInput = '';
    this.autorInput = '';
    this.rokInput = 2020;
    this.dostepnoscInput = 1;
  }

  deleteBook(id: number) {
    this._booksService.deleteBook(id);
  }
}
