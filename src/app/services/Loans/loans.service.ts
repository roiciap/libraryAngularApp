import { Wypozyczenie } from './../../../Types/Wypozyczenie';
import { map, Observable } from 'rxjs';
import { LoansStoreService } from './loans-store.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoansService {
  constructor(private _loansStore: LoansStoreService) {}

  getAllLoans(): Observable<Array<Wypozyczenie>> {
    return this._loansStore.getBooks();
  }

  getPersonLoans(osobaId: number) {
    return this.getAllLoans().pipe(
      map((val) => val.filter((loan) => loan.idOsoba === osobaId))
    );
  }

  getBookLoans(bookId: number) {
    return this.getAllLoans().pipe(
      map((val) => val.filter((loan) => loan.idKsiazka === bookId))
    );
  }
}
