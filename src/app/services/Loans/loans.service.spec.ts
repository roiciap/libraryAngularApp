import { Wypozyczenie } from '../../../Types/Wypozyczenie';
import { LoansService } from './loans.service';
///import { RouterLinkActive } from '@angular/router';
import { of } from 'rxjs';
import { Ksiazka } from 'src/Types/Ksiazka';
import { Osoba } from 'src/Types/Osoba';
///////////////////////////
///przejdz do 155 linii (18-152 to 3 tablice możesz sb po prostu schować)
/////////////////////////
describe('LoansService', () => {
  let service: LoansService;
  let loansStore: any;
  let booksService: any;
  let personService: any;
  let paymentService: any;

  const loans: Array<Wypozyczenie> = [
    {
      id: '1',
      idOsoba: '1',
      idKsiazka: '1',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '2',
      idOsoba: '1',
      idKsiazka: '2',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '3',
      idOsoba: '2',
      idKsiazka: '2',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '4',
      idOsoba: '1',
      idKsiazka: '1',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '5',
      idOsoba: '1',
      idKsiazka: '1',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '6',
      idOsoba: '1',
      idKsiazka: '1',
      dataPrzyjecia: new Date(),
      dataOddania: new Date(),
    },
    {
      id: '7',
      idOsoba: '10',
      idKsiazka: '2',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '8',
      idOsoba: '4',
      idKsiazka: '1',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
  ];
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
  const people: Array<Osoba> = [
    { id: '1', imie: 'Janusz', nazwisko: 'Kowalski' },
    { id: '2', imie: 'Jan', nazwisko: 'Adamowski' },
    { id: '3', imie: 'Zbigniew', nazwisko: 'Karaś' },
    { id: '4', imie: 'Mariusz', nazwisko: 'Morgan' },
    { id: '5', imie: 'Marcin', nazwisko: 'Bandura' },
    { id: '6', imie: 'Adam', nazwisko: 'Ślusarz' },
    { id: '7', imie: 'Anna', nazwisko: 'Kowalska' },
    { id: '8', imie: 'Weronika', nazwisko: 'Kmiecik' },
    { id: '9', imie: 'Bożena', nazwisko: 'Krawiec' },
    { id: '10', imie: 'Malik', nazwisko: 'Montana' },
  ];

  beforeEach(() => {
    loansStore = {
      getLoans: jest.fn(),
      refresh: jest.fn(),
      updateLoan: jest.fn(),
      getLoan: jest.fn(),
    };
    paymentService = {
      update: jest.fn(),
      getPayment: jest.fn(),
      checkPaidLoan: jest.fn(),
      refresh: jest.fn(),
      payLoan: jest.fn(),
    };
    booksService = {
      getBook: jest.fn(),
      updateBook: jest.fn(),
      getAllBooks: jest.fn(),
    };
    personService = {
      getPerson: jest.fn(),
    };
    service = new LoansService(
      loansStore, //
      booksService,
      personService,
      paymentService
    );

    jest.spyOn(loansStore, 'getLoans').mockReturnValue(of(loans));
    jest.spyOn(loansStore, 'refresh');
    jest.spyOn(booksService, 'updateBook');
    jest.spyOn(booksService, 'getAllBooks').mockReturnValue(of(books));
    jest.spyOn(paymentService, 'update');
    jest.spyOn(paymentService, 'getPayment').mockReturnValue(of(loans[0])); //???
    jest.spyOn(paymentService, 'checkPaidLoan').mockReturnValue(false);
    jest.spyOn(paymentService, 'refresh');
  });
  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should call Store.getLoans ', () => {
    service.getAllLoans();
    expect(loansStore.getLoans).toBeCalled();
  });
  it('should return all', (done) => {
    service.getAllLoans().subscribe((data) => {
      expect(data).toEqual(loans);
      done();
    });
  });
  it('should return all unreturned loans', (done) => {
    service.getAllUnreturnedLoans().subscribe((data) => {
      expect(data).toEqual(loans.filter((loan) => loan.dataOddania == null));
      done();
    });
  });
  it('should return all returned loans', (done) => {
    service.getAllReturnedLoans().subscribe((data) => {
      expect(data).toEqual(loans.filter((loan) => loan.dataOddania !== null));
      done();
    });
  });
  it('should return all loans of a person', (done) => {
    const testId = '1';
    service.getPersonLoans(testId).subscribe((data) => {
      expect(data).toEqual(loans.filter((loan) => loan.idOsoba === testId));
      done();
    });
  });
  it('should return all  loans of a book', (done) => {
    jest.spyOn(booksService, 'getBook').mockReturnValue(of(books[0]));
    const testId = '1';
    service.getBookLoans(testId).subscribe((data) => {
      expect(data).toEqual(loans.filter((loan) => loan.idKsiazka === testId));
      done();
    });
  });
  ///////////////////ADD
  ////-----
  it('should call update payment for every loan', () => {
    const toSpy = jest.spyOn(paymentService, 'update');
    jest.spyOn(paymentService, 'getPayment').mockReturnValue(of(loans[0])); //???
    jest.spyOn(paymentService, 'checkPaidLoan').mockReturnValue(false);
    service.refreshPayments();
    expect(toSpy).toBeCalledTimes(loans.length);
  });

  it('book shouldnt be returned', () => {
    const dateReturned = new Date();
    dateReturned.setDate(dateReturned.getDate() - 6);
    expect(service.returnBook('1', dateReturned)).toBeFalsy();
    expect(service.returnBook('')).toBeFalsy();
    expect(service.returnBook('6')).toBeFalsy(); //6 is already returned
  });

  it('should not add new loan', () => {
    const randomKId = Math.random().toString(32);
    const randomOId = Math.random().toString(32);
    jest
      .spyOn(personService, 'getPerson')
      .mockReturnValue(of(people.find((p) => p.id === randomOId)));
    jest
      .spyOn(booksService, 'getBook')
      .mockReturnValue(of(books.find((b) => b.id === randomKId)));
    expect(
      service.addLoan({
        idKsiazka: randomKId,
        idOsoba: randomOId,
      })
    ).toBeFalsy();
    expect(service.addLoan({ idKsiazka: '1', idOsoba: randomOId })).toBeFalsy();
    expect(service.addLoan({ idKsiazka: randomKId, idOsoba: '1' })).toBeFalsy();
  });

  it('should not be able to pay ', () => {
    jest.spyOn(paymentService, 'payLoan');
    jest.spyOn(loansStore, 'getLoan').mockReturnValue(of(loans[0]));
    const updated = jest.spyOn(paymentService, 'update');
    expect(updated).not.toBeCalled();
    expect(service.payLoan('1')).toBeFalsy();
  });
});
