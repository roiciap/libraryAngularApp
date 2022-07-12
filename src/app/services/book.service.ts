import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, reduce } from 'rxjs';
import { Ksiazka } from 'src/Types/Ksiazka';
import { BookStoreServie } from './book-store.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private readonly bookStoreSrv: BookStoreServie) {}

  getAllBooks(): Observable<Array<Ksiazka>> {
    return this.bookStoreSrv.getAllBook();
  }

  getSearchedBooks(searched: string): Observable<Array<Ksiazka>> {
    return this.getAllBooks().pipe(
      map((val) =>
        val.filter((book) =>
          (book.autor + ' ' + book.nazwa)
            .toLocaleLowerCase()
            .includes(searched.toLowerCase())
        )
      )
    );
  }

  addBook(toAdd: {
    nazwa: string;
    autor: string;
    rokWydania: number;
    dostepnosc: number;
  }) {
    let toAddId: number = 0;
    this.getAllBooks()
      .pipe(
        map((data) =>
          data.reduce((max, val) => (max < val.id ? val.id : max), 0)
        )
      )
      .subscribe((data) => {
        toAddId = data + 1;
      })
      .unsubscribe();
    const addedItem = { ...toAdd, id: toAddId };
    this.bookStoreSrv.addNewBook(addedItem);
  }

  updateBook(updated: Ksiazka): void {
    this.bookStoreSrv.updateBook(updated);
  }
}
