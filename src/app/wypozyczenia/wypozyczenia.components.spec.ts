import { Osoba } from 'src/Types/Osoba';
import { LoanDescription } from 'src/Types/LoanDescription';
import { WypozyczeniaComponent } from './wypozyczenia.component';
import { Ksiazka } from 'src/Types/Ksiazka';
import { of } from 'rxjs';
describe('WypozyczeniaComponent', () => {
  let component: WypozyczeniaComponent;
  let loansService: any;

  let books: Array<Ksiazka> = [
    {
      id: '1',
      autor: 'autor1',
      nazwa: 'nazwa1',
      rokWydania: 2137,
      dostepnosc: 12,
    },
    {
      id: '2',
      autor: 'autor2',
      nazwa: 'nazwa2',
      rokWydania: 2107,
      dostepnosc: 21,
    },
  ];
  let people: Array<Osoba> = [
    { id: '1', imie: 'imie1', nazwisko: 'nazwisko1' },
    { id: '2', imie: 'imie2', nazwisko: 'nazwisko2' },
  ];
  let loansDetails: Array<LoanDescription> = [
    {
      Person: people[0],
      Book: books[0],
      Payment: {
        id: '1',
        kwota: 0,
        oplacone: false,
        idWypozyczenia: '1',
      },
      Loan: {
        id: '1',
        idOsoba: '1',
        idKsiazka: '1',
        dataPrzyjecia: new Date(),
        dataOddania: null,
      },
    },
    {
      Person: people[1],
      Book: books[0],
      Payment: {
        id: '2',
        kwota: 0,
        oplacone: false,
        idWypozyczenia: '2',
      },
      Loan: {
        id: '2',
        idOsoba: '2',
        idKsiazka: '1',
        dataPrzyjecia: new Date(),
        dataOddania: null,
      },
    },
    {
      Person: people[0],
      Book: books[1],
      Payment: {
        id: '3',
        kwota: 0,
        oplacone: false,
        idWypozyczenia: '3',
      },
      Loan: {
        id: '3',
        idOsoba: '1',
        idKsiazka: '2',
        dataPrzyjecia: new Date(),
        dataOddania: null,
      },
    },
  ];

  beforeAll(() => {
    loansService = {
      getLoansDetails: jest.fn(),
      returnBook: jest.fn(),
    };

    component = new WypozyczeniaComponent(loansService);
  });
  it('should contain whole array', () => {
    jest
      .spyOn(loansService, 'getLoansDetails')
      .mockReturnValue(of(loansDetails));
    component.ngOnInit();
    expect(component.loans).toEqual(loansDetails);
  });
  it('should calculate amout of people with debts', () => {
    jest
      .spyOn(loansService, 'getLoansDetails')
      .mockReturnValue(of(loansDetails));
    component.ngOnInit();
    expect(component.peopleWithLoans).toEqual(2);
  });
  it('should be empty', () => {
    jest.spyOn(loansService, 'getLoansDetails').mockReturnValue(of([]));
    component.ngOnInit();
    expect(component.peopleWithLoans).toEqual(0);
    expect(component.loans).toEqual([]);
  });
});
