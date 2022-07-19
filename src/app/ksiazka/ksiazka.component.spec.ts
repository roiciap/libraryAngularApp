import { of } from 'rxjs';
import { Ksiazka } from 'src/Types/Ksiazka';
import { KsiazkaComponent } from './ksiazka.component';
describe('KsiazkaComponent', () => {
  let books: Array<Ksiazka> = [
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

  let component: KsiazkaComponent;
  let booksService: any;
  beforeEach(() => {
    booksService = {
      getAllBooks: jest.fn(),
      getSearchedBooks: jest.fn(),
      addBook: jest.fn(),
    };
    component = new KsiazkaComponent(booksService);
    jest.spyOn(booksService, 'getAllBooks').mockReturnValue(of(books));
    jest.spyOn(booksService, 'addBook');
    jest
      .spyOn(booksService, 'getSearchedBooks')
      .mockReturnValue(
        of(
          books.filter((val) => [val.autor, val.nazwa].join(' ').includes('z'))
        )
      );
    component.ngOnInit();
  });
  it('should get all books', () => {
    expect(component.books).toEqual(books);
  });
  it('should get all books with "z" in name or author', () => {
    component.booksSearch('z');
    expect(component.books).toEqual(
      books.filter((val) => [val.autor, val.nazwa].join(' ').includes('z'))
    );
  });
  it('should clear inputs after adding book', () => {
    const addSpy = jest.spyOn(booksService, 'addBook');
    component.nazwaInput = 'asd';
    component.autorInput = 'asd';
    component.rokInput = 2137;
    component.dostepnoscInput = 2137;
    component.addBook();
    expect(
      component.nazwaInput === '' &&
        component.autorInput === '' &&
        component.dostepnoscInput === 1 &&
        component.rokInput === 2020
    ).toBeTruthy();
    expect(addSpy).toBeCalled();
  });
  it('add and search bars should not be shown togeather and close propertly ', () => {
    expect(!component.showSearch && !component.showAdd).toBeFalsy(); //true means hidden - false shown
    component.toggleAddBar();
    expect(!component.showSearch && !component.showAdd).toBeFalsy();
    component.toggleSearch();
    expect(!component.showSearch && !component.showAdd).toBeFalsy();
    component.toggleAddBar();
    expect(!component.showSearch && !component.showAdd).toBeFalsy();
    component.toggleAddBar();
    expect(!component.showSearch || !component.showAdd).toBeFalsy();
  });
});
