// todo: nie używane importy
import { BookService } from '../services/books/book.service';
import { Component, OnInit } from '@angular/core';
import { Wypozyczenie } from 'src/Types/Wypozyczenie';
import { Ksiazka } from 'src/Types/Ksiazka';
import { Osoba } from 'src/Types/Osoba';
import { LoansService } from '../services/Loans/loans.service';
import { LoanDescription } from 'src/Types/LoanDescription';

@Component({
  selector: 'app-wypozyczenia',
  templateUrl: './wypozyczenia.component.html',
  styleUrls: ['./wypozyczenia.component.css'],
})
// todo czemu polska nazwa
export class WypozyczeniaComponent implements OnInit {
  // todo pierw deklarujemy zmienne potem constructor potem metody czystosć

  // todo po co _
  constructor(private _loansService: LoansService) {
    _loansService.returnBook(4);
  }

  loans: Array<Wypozyczenie> = [];

  loansWD: Array<LoanDescription> = [];

  ngOnInit(): void {
    this.getLoans();
    this.getLoansDescription(true);
  }
  ksiazkaInput: number = 0;
  osobaInput: number = 0;

  // todo: zwracany typ
  submit() {
    this._loansService.addLoan({
      idKsiazka: this.ksiazkaInput,
      idOsoba: this.osobaInput,
    });
  }

  getLoans() {
    this._loansService
      .getAllLoans()
      .subscribe((data) => (this.loans = [...data]));
  }

  // todo: jak nie uzywane to wyjebanc
  getLoansDescription(returned: boolean = false) {
    this._loansService
      .getLoansDetails({ returned: false })
      .subscribe((data) => (this.loansWD = data));
  }
  returnBook(loanID: number) {
    this._loansService.returnBook(loanID);
  }
}
