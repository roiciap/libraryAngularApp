import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Ksiazka } from 'src/models/Ksiazka';

// todo nazwa folderów z małem litery

export class BookStoreService {
  private books: Array<Ksiazka> = [
    {
      id: '1',
      nazwa: 'Harry Potter i Kamień Filozoficzny',
      autor: 'J.K. Rowling',
      rokWydania: 1997,
      dostepnosc: 20,
    },
    {
      id: '2',
      nazwa: 'Harry Potter i Komnata Tajemnic',
      autor: 'J.K. Rowling',
      rokWydania: 1998,
      dostepnosc: 20,
    },
    {
      id: '3',
      nazwa: 'Dziady III',
      autor: 'Adam Mickiewicz',
      rokWydania: 2006,
      dostepnosc: 6,
    },
    {
      id: '4',
      nazwa: 'Kordian',
      autor: 'Juliusz Słowacki',
      rokWydania: 2003,
      dostepnosc: 32,
    },
    {
      id: '5',
      nazwa: 'Metro 2033',
      autor: 'Dmitrij Głuchowski',
      rokWydania: 2003,
      dostepnosc: 33,
    },
    {
      id: '6',
      nazwa: 'Metro 2034',
      autor: 'Dmitrij Głuchowski',
      rokWydania: 2009,
      dostepnosc: 34,
    },
    {
      id: '7',
      nazwa: 'Metro 2035',
      autor: 'Dmitrij Głuchowski',
      rokWydania: 2015,
      dostepnosc: 35,
    },
    {
      id: '8',
      nazwa: 'Zew Cthulhu',
      autor: 'H.P. Lovecraft',
      rokWydania: 2008,
      dostepnosc: 12,
    },
    {
      id: '9',
      nazwa: 'Pan Tadeusz',
      autor: 'Adam Mickiewicz',
      rokWydania: 1998,
      dostepnosc: 28,
    },
    {
      id: '10',
      nazwa: 'Ballady i Romanse',
      autor: 'Adam Mickiewicz',
      rokWydania: 1978,
      dostepnosc: 13,
    },
    {
      id: '11',
      nazwa: 'Góry Szaleństwa',
      autor: 'H.P. Lovecraft',
      rokWydania: 1948,
      dostepnosc: 28,
    },
    {
      id: '12',
      nazwa: 'Władca Pierścien',
      autor: 'J.R.R. Tolkien',
      rokWydania: 1956,
      dostepnosc: 21,
    },
    {
      id: '13',
      nazwa: 'Hobbit',
      autor: 'J.R.R. Tolkien',
      rokWydania: 1964,
      dostepnosc: 37,
    },
    {
      id: '14',
      nazwa: 'Pieśń lodu i ognia',
      autor: 'George R.R. Martin',
      rokWydania: 1964,
      dostepnosc: 14,
    },
    {
      id: '15',
      nazwa: 'Ostatnie życzenie',
      autor: 'Andrzej Sapkowski',
      rokWydania: 1993,
      dostepnosc: 21,
    },
    {
      id: '16',
      nazwa: 'Miecz przeznaczenia',
      autor: 'Andrzej Sapkowski',
      rokWydania: 1993,
      dostepnosc: 17,
    },
    {
      id: '17',
      nazwa: 'Krew elfów',
      autor: 'Andrzej Sapkowski',
      rokWydania: 1994,
      dostepnosc: 15,
    },
    {
      id: '18',
      nazwa: 'FUTU.RE',
      autor: 'Dmitrij Głuchowski',
      rokWydania: 1994,
      dostepnosc: 7,
    },
    {
      id: '19',
      nazwa: 'Chemia klasa 8',
      autor: 'Nowa Era',
      rokWydania: 2016,
      dostepnosc: 32,
    },
    {
      id: '20',
      nazwa: 'Chemia klasa 9',
      autor: 'Nowa Era',
      rokWydania: 2015,
      dostepnosc: 25,
    },
  ];
  // todo: formatowanie
  private booksObs: BehaviorSubject<Array<Ksiazka>> = new BehaviorSubject(
    this.books
  );

  addNewBook(toAdd: Ksiazka): Observable<Ksiazka> {
    this.booksObs.value.push(toAdd);
    this.booksObs.next(this.books);
    return of(toAdd);
  }

  // todo: id jest stringiem
  deleteBook(id: string): void {
    const toDelete = this.booksObs.value.findIndex((val) => val.id === id);
    if (toDelete === -1) return;
    this.booksObs.value.splice(toDelete, 1);
    this.booksObs.next(this.books);
  }

  updateBook(updated: Ksiazka): Observable<Ksiazka> {
    const toUpdate = this.books.findIndex((val) => val.id === updated.id);
    if (toUpdate === -1) throw new Error('Cant find book');

    this.books[toUpdate] = { ...updated };
    this.booksObs.next(this.books);
    return of(this.books[toUpdate]);
  }

  // todo nie powinien zwracać undefined
  getBook(id: string): Observable<Ksiazka> {
    return this.booksObs.asObservable().pipe(
      map((val) => {
        const toRet = val.find((bok) => bok.id === id);
        if (toRet === undefined) throw new Error('cant find book');
        return toRet;
      })
    );
  }

  getAllBook(): Observable<Array<Ksiazka>> {
    return this.booksObs.asObservable();
  }
}
