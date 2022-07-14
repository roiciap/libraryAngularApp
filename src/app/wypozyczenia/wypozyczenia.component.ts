import { BookService } from './../services/Books/book.service';
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
export class WypozyczeniaComponent implements OnInit {
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

  getLoansDescription(returned: boolean = false) {
    this._loansService
      .getLoansDetails({ returned: false })
      .subscribe((data) => (this.loansWD = data));
  }
}
