import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Ksiazka } from 'src/Types/Ksiazka';
import { BookStoreService } from './book-store.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private readonly bookStoreSrv: BookStoreService) {}

  getAllBooks(): Observable<Array<Ksiazka>> {
    return this.bookStoreSrv.getAllBook();
  }

  getSearchedBooks(searched: string): Observable<Array<Ksiazka>> {
    if (searched.trim() === '') return this.getAllBooks();
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
    if (!toAdd.nazwa || !toAdd.autor || toAdd.dostepnosc < 0) return false;
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
    if (updated.dostepnosc < 0) return false;
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

  getBook(id: number): Observable<Ksiazka | undefined> {
    return this.bookStoreSrv.getBook(id);
  }
}
