import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Wypozyczenie } from 'src/Types/Wypozyczenie';
import { getLocaleEraNames } from '@angular/common';
import { Statement } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class LoansStoreService {
  private loans: Array<Wypozyczenie> = [
    {
      id: 1,
      idOsoba: 1,
      idKsiazka: 1,
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: 2,
      idOsoba: 1,
      idKsiazka: 2,
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: 3,
      idOsoba: 2,
      idKsiazka: 2,
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: 4,
      idOsoba: 1,
      idKsiazka: 1,
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: 5,
      idOsoba: 1,
      idKsiazka: 1,
      dataPrzyjecia: new Date(),
      dataOddania: null,
    },
    {
      id: 6,
      idOsoba: 1,
      idKsiazka: 1,
      dataPrzyjecia: new Date(),
      dataOddania: new Date(),
    },
    {
      id: 7,
      idOsoba: 10,
      idKsiazka: 2,
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

  deleteLoan(id: number) {
    const toDeleteIndex = this.loans.findIndex((val) => val.id === id);
    this.loans.splice(toDeleteIndex, 1);
    this.loansObs.next(this.loans);
  }

  updateLoan(newState: Wypozyczenie) {
    let toUpdateIndex = this.loans.findIndex((val) => val.id === newState.id);
    this.loans[toUpdateIndex] = newState;
  }

  addLoan(newLoan: Wypozyczenie) {
    this.loans.push(newLoan);
    this.loansObs.next(this.loans);
  }
}
