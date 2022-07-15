import { BehaviorSubject, map, Observable } from 'rxjs';
import { Ksiazka } from 'src/Types/Ksiazka';

// todo nazwa folderów z małem litery

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
    {
      id: 3,
      nazwa: 'Dziady III',
      autor: 'Adam Mickiewicz',
      rokWydania: 2006,
      dostepnosc: 6,
    },
    {
      id: 4,
      nazwa: 'Kordian',
      autor: 'Juliusz Słowacki',
      rokWydania: 2003,
      dostepnosc: 32,
    },
    {
      id: 5,
      nazwa: 'Metro 2033',
      autor: 'Dmitrij Głuchowski',
      rokWydania: 2003,
      dostepnosc: 33,
    },
    {
      id: 6,
      nazwa: 'Metro 2034',
      autor: 'Dmitrij Głuchowski',
      rokWydania: 2009,
      dostepnosc: 34,
    },
    {
      id: 7,
      nazwa: 'Metro 2035',
      autor: 'Dmitrij Głuchowski',
      rokWydania: 2015,
      dostepnosc: 35,
    },
    {
      id: 8,
      nazwa: 'Zew Cthulhu',
      autor: 'H.P. Lovecraft',
      rokWydania: 2008,
      dostepnosc: 12,
    },
    {
      id: 9,
      nazwa: 'Pan Tadeusz',
      autor: 'Adam Mickiewicz',
      rokWydania: 1998,
      dostepnosc: 28,
    },
  ];
  // todo: formatowanie
  private booksObs: BehaviorSubject<Array<Ksiazka>> = new BehaviorSubject(
    this.books
  );

  addNewBook(toAdd: Ksiazka): void {
    this.booksObs.value.push(toAdd);
    this.booksObs.next(this.books);
  }

  // todo: id jest stringiem
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
    this.booksObs.next(this.books);
  }

  // todo nie powinien zwracać undefined
  getBook(id: number): Observable<Ksiazka | undefined> {
    return this.booksObs
      .asObservable()
      .pipe(map((val) => val.find((bok) => bok.id === id)));
  }

  getAllBook(): Observable<Array<Ksiazka>> {
    return this.booksObs.asObservable();
  }
}
