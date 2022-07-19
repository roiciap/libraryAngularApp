import { BookStoreService } from './book-store.service';
import { of } from 'rxjs';
import { BookService } from './book.service';
import { map, catchError } from 'rxjs/operators';
describe('BookService', () => {
  let books = [
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
  ];

  let service: BookService;
  let store: any;

  beforeEach(() => {
    store = {
      addNewBook: jest.fn(),
      deleteBook: jest.fn(),
      updateBook: jest.fn(),
      getBook: jest.fn(),
      getAllBook: jest.fn(),
    };
    jest.spyOn(store, 'addNewBook');
    jest.spyOn(store, 'getAllBook').mockReturnValue(of(books));
    service = new BookService(store);
  });

  it('should match 1st book', (done) => {
    const xd = 'sad';
    jest.spyOn(store, 'getBook').mockReturnValue(of(books[0]));
    service.getBook('1').subscribe((data) => {
      expect(data).toEqual(books[0]);
      done();
    });
  });

  it('should add book', () => {
    expect(
      service.addBook({
        nazwa: 'nazwa',
        autor: 'autor',
        dostepnosc: 150,
        rokWydania: 2137,
      })
    ).toBeTruthy();
  });

  it('shpuld not add book', () => {
    expect(
      service.addBook({
        nazwa: '',
        autor: 'autor',
        dostepnosc: 150,
        rokWydania: 2137,
      })
    ).toBeFalsy();

    expect(
      service.addBook({
        nazwa: '123',
        autor: '',
        dostepnosc: 150,
        rokWydania: 2137,
      })
    ).toBeFalsy();

    expect(
      service.addBook({
        nazwa: '123',
        autor: 'autor',
        dostepnosc: -1,
        rokWydania: 2137,
      })
    ).toBeFalsy();
  });
});
