import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
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
    return this.bookStoreSrv
      .getAllBook()
      .pipe(
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
  }): void {
    let toAddId: number = -1;
    this.getAllBooks().subscribe(
      (data) =>
        (toAddId =
          data.reduce((max, val) => (val.id > max ? val.id : max), 0) + 1)
    );

    this.bookStoreSrv.addNewBook({ id: toAddId, ...toAdd });
  }

  updateBook(updated: Ksiazka): void {
    this.bookStoreSrv.updateBook(updated);
  }
}
