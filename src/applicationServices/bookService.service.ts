import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import BookStore from 'src/domain/bookStore.service';
import { Ksiazka } from 'src/models/Ksiazka';
import LoanStore from 'src/domain/loanStore.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(
    private readonly bookStore: BookStore,
    private readonly loanStore: LoanStore
  ) {}
  getBook(bookId: string): Observable<Ksiazka> {
    return this.bookStore.get(bookId);
  }
  getAllBooks(searchedValue?: string): Observable<Ksiazka[]> {
    return this.bookStore
      .getAll()
      .pipe(
        map((val) =>
          searchedValue !== undefined
            ? val.filter((book) =>
                [book.autor, book.nazwa, book.rokWydania]
                  .join(' ')
                  .includes(searchedValue)
              )
            : val
        )
      );
  }
  addBook(book: Ksiazka): Observable<Ksiazka> {
    return this.bookStore.add(book);
  }
  updateBook(book: Ksiazka): Observable<Ksiazka> {
    return this.bookStore.update(book);
  }
  deleteBook(bookId: string): boolean {
    this.loanStore.getAll().pipe(
      map((val) => val.filter((loan) => loan.idKsiazka === bookId)),
      tap((val) => val.forEach((l) => this.loanStore.delete(l.id)))
    );
    return this.bookStore.delete(bookId);
  }
}
