import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/books/book.service';
import { Ksiazka } from 'src/Types/Ksiazka';

@Component({
  selector: 'app-ksiazka',
  templateUrl: './ksiazka.component.html',
  styleUrls: ['./ksiazka.component.css'],
})
export class KsiazkaComponent implements OnInit {
  books: Array<Ksiazka> = [];
  searchedValue: string = '';

  nazwaInput: string = '';
  autorInput: string = '';
  rokInput: number = 2000;
  dostepnoscInput: number = 1;

  showSearch: boolean = true;
  showAdd: boolean = true;

  constructor(private readonly booksService: BookService) {}

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
    this.booksService.getAllBooks().subscribe((data) => {
      this.books = data;
    });
  }

  booksSearch(searched: string) {
    this.booksService
      .getSearchedBooks(searched)
      .subscribe((data) => (this.books = data.slice()));
  }

  addBook(): string {
    const val = this.booksService.addBook({
      nazwa: this.nazwaInput,
      autor: this.autorInput,
      rokWydania: this.rokInput,
      dostepnosc: this.dostepnoscInput,
    });
    this.nazwaInput = '';
    this.autorInput = '';
    this.rokInput = 2020;
    this.dostepnoscInput = 1;
    return val;
  }

  deleteBook(id: string) {
    this.booksService.deleteBook(id);
  }
}
