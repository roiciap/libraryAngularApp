import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
          (book.autor + ' ' + book.nazwa + ' ' + book.rokWydania)
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
  }): boolean {
    if (!toAdd.nazwa || !toAdd.autor) return false;
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
    return true;
  }

  updateBook(updated: Ksiazka): boolean {
    let found: boolean = false;
    this.getAllBooks()
      .pipe(
        map((val) => val.findIndex((searched) => searched.id === updated.id))
      )
      .subscribe((data) => {
        if (data >= 0) found = true;
      })
      .unsubscribe();
    if (!found) return false;
    this.bookStoreSrv.updateBook(updated);
    return true;
  }

  deleteBook(deletedId: number): void {
    this.bookStoreSrv.deleteBook(deletedId);
  }

  getBook(id: number): Ksiazka | undefined {
    let book: Ksiazka | undefined;

    this.getAllBooks()
      .pipe(map((val) => val.find((searched) => searched.id === id)))
      .subscribe((data) => (book = data))
      .unsubscribe();
    return book ? { ...book } : book;
  }
}
