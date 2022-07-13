import { BehaviorSubject, Observable } from 'rxjs';
import { Ksiazka } from 'src/Types/Ksiazka';

export class BookStoreServie {
  private books: Array<Ksiazka> = [
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
  private booksObs: BehaviorSubject<Array<Ksiazka>> = new BehaviorSubject(
    this.books
  );

  addNewBook(toAdd: Ksiazka): void {
    this.booksObs.value.push(toAdd);
    this.booksObs.next(this.books);
  }

  deleteBook(id: number): void {
    const toDelete = this.booksObs.value.findIndex((val) => val.id === id);
    if (toDelete === -1) return;
    this.booksObs.value.splice(toDelete, 1);
    this.booksObs.next(this.books);
  }

  updateBook(updated: Ksiazka): void {
    const toUpdate = this.booksObs.value.findIndex(
      (val) => val.id === updated.id
    );
    if (toUpdate === -1) return;

    this.booksObs.value[toUpdate] = { ...updated };
    console.log(this.books);
    this.booksObs.next(this.books);
  }

  getBook(id: number): Ksiazka | undefined {
    const book = this.booksObs.value.find((val) => val.id === id);
    return book;
  }

  getAllBook(): Observable<Array<Ksiazka>> {
    return this.booksObs.asObservable();
  }
}
