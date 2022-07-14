import { LoansService } from './../services/Loans/loans.service';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/Books/book.service';
import { Ksiazka } from 'src/Types/Ksiazka';

@Component({
  selector: 'app-ksiazka',
  templateUrl: './ksiazka.component.html',
  styleUrls: ['./ksiazka.component.css'],
})
export class KsiazkaComponent implements OnInit {
  constructor(
    private booksService: BookService,
    private loansService: LoansService
  ) {}
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
    this.loansService.getAvalibleBooks().subscribe((data) => {
      console.log(data);
      this.books = data;
    });
  }

  booksSearch(searched: string) {
    this.loansService
      .getAvalibleBooks(this.searchedValue)
      .subscribe((data) => (this.books = data.slice()));
  }

  addBook(): void {
    this.booksService.addBook({
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
    this.booksService.deleteBook(id);
  }
}
