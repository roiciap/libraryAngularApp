import { BehaviorSubject, Observable } from 'rxjs';
import { Ksiazka } from 'src/Types/Ksiazka';

export class BookStoreServie {
  private books: BehaviorSubject<Array<Ksiazka>> = new BehaviorSubject([
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
  ]);

  addNewBook(toAdd: Ksiazka): void {
    this.books.value.push(toAdd);
  }

  deleteBook(id: number): void {
    const toDelete = this.books.value.findIndex((val) => val.id === id);
    if (toDelete === -1) return;
    this.books.value.splice(toDelete, 1);
  }

  updateBook(updated: Ksiazka): void {
    const toUpdate = this.books.value.findIndex((val) => val.id === updated.id);
    if (toUpdate === -1) return;

    this.books.value[toUpdate] = { ...updated };
  }

  getBook(id: number): Ksiazka | undefined {
    const book = this.books.value.find((val) => val.id === id);
    return book;
  }

  getAllBook(): Observable<Array<Ksiazka>> {
    return this.books.asObservable();
  }
}
