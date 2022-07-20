// importy nieużywane
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Wypozyczenie } from 'src/Types/Wypozyczenie';

@Injectable({
  providedIn: 'root',
})
export class LoansStoreService {
  private loans: Array<Wypozyczenie> = [
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
    {
      id: '9',
      idOsoba: '5',
      idKsiazka: '5',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '10',
      idOsoba: '6',
      idKsiazka: '6',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '11',
      idOsoba: '7',
      idKsiazka: '7',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '12',
      idOsoba: '8',
      idKsiazka: '8',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '13',
      idOsoba: '9',
      idKsiazka: '9',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '14',
      idOsoba: '10',
      idKsiazka: '10',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '15',
      idOsoba: '15',
      idKsiazka: '15',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '16',
      idOsoba: '16',
      idKsiazka: '16',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '17',
      idOsoba: '17',
      idKsiazka: '17',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '18',
      idOsoba: '18',
      idKsiazka: '18',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '19',
      idOsoba: '19',
      idKsiazka: '19',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: '20',
      idOsoba: '20',
      idKsiazka: '20',
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
  ];

  private loansObs: BehaviorSubject<Array<Wypozyczenie>> = new BehaviorSubject<
    Array<Wypozyczenie>
  >(this.loans);
  constructor() {}

  getLoans(): Observable<Array<Wypozyczenie>> {
    return this.loansObs.asObservable();
  }

  deleteLoan(id: string) {
    const toDeleteIndex = this.loans.findIndex((val) => val.id === id);
    this.loans.splice(toDeleteIndex, 1);
    this.loansObs.next(this.loans);
  }

  updateLoan(newState: Wypozyczenie) {
    let toUpdateIndex = this.loans.findIndex((val) => val.id === newState.id);
    this.loans[toUpdateIndex] = newState;
    this.loansObs.next(this.loans);
  }

  addLoan(newLoan: Wypozyczenie) {
    this.loans.push(newLoan);
    this.loansObs.next(this.loans);
  }
  getLoan(id: string): Observable<Wypozyczenie | undefined> {
    return this.loansObs
      .asObservable()
      .pipe(map((val) => val.find((loan) => loan.id == id)));
  }
  refresh() {
    this.loansObs.next(this.loans);
  }
}
