import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ksiazka } from 'src/Types/Ksiazka';

const initialBooks: Array<Ksiazka> = [
  {
    id: 1,
    nazwa: 'Harry Potter i Kamień Filozoficzny',
    autor: 'J.K. Rowling',
    rokWydania: 1997,
    dostepnosc: 20,
  },
  {
    id: 2,
    nazwa: 'Harry Potter i Komnata Tajemnic',
    autor: 'J.K. Rowling',
    rokWydania: 1998,
    dostepnosc: 20,
  },
];

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor() {}

  getAllBooks(): Array<Ksiazka> {
    return initialBooks.slice();
  }

  getSearchedBooks(searched: string): Array<Ksiazka> {
    return initialBooks
      .filter((val) => (val.autor + ' ' + val.nazwa).includes(searched))
      .slice();
  }

  addBook(toAdd: {
    nazwa: string;
    autor: string;
    rokWydania: number;
    dostepnosc: number;
  }): Array<Ksiazka> {
    const toAddId = initialBooks.reduce(
      (max, val) => (val.id > max ? val.id : max),
      0
    );

    initialBooks.push({ id: toAddId, ...toAdd });
    return initialBooks.slice();
  }

  updateBook(
    id: number,
    toUpdate: {
      nazwa?: string;
      autor?: string;
      rokWydania?: number;
      dostepnosc?: number;
    }
  ): Array<Ksiazka> {
    const updatedItems = initialBooks.filter((val) => val.id === id);
    if (updatedItems.length !== 1) return initialBooks;
    let updatedItem = updatedItems[0];

    if (toUpdate['nazwa']) {
      updatedItem.nazwa = toUpdate.nazwa;
    }
    if (toUpdate['autor']) {
      updatedItem.autor = toUpdate.autor;
    }
    if (toUpdate['rokWydania']) {
      updatedItem.rokWydania = toUpdate.rokWydania;
    }
    if (toUpdate['dostepnosc']) {
      updatedItem.dostepnosc = toUpdate.dostepnosc;
    }

    return initialBooks;
  }
}
