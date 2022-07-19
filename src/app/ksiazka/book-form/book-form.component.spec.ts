import { BookFormComponent } from './book-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Ksiazka } from 'src/Types/Ksiazka';

class routeMock {
  // public paramMap = of(
  //   convertToParamMap({
  //     get()=>{return 'abc'},
  //     anotherId: 'd31e8b48-7309-4c83-9884-4142efdf7271',
  //   })
  // );
}

describe('BookFormComponent', () => {
  const books: Array<Ksiazka> = [
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
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let activatedRoute: routeMock = new routeMock();

  let loansService: any;
  let bookService: any;
  let route = beforeEach(() => {
    bookService = {
      getBook: jest.fn(),
      updateBook: jest.fn(),
    };
    loansService = {
      getLoansDetails: jest.fn(),
      returnBook: jest.fn(),
    };

    jest.spyOn(loansService, 'getLoansDetails');
    jest.spyOn(loansService, 'returnBook');
    jest.spyOn(bookService, 'getBook').mockReturnValue(of(books[0]));
    jest.spyOn(bookService, 'updateBook');
    component = new BookFormComponent(
      loansService,
      activatedRoute as any,
      bookService
    );
  });
  it('should be ok to start', () => {
    component.ngOnInit();
    expect(component.id).toEqual('a');
  });
});
