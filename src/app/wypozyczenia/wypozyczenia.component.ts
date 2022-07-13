import { LoansService } from './../services/Loans/loans.service';
import { Component, OnInit } from '@angular/core';
import { Wypozyczenie } from 'src/Types/Wypozyczenie';
import { Ksiazka } from 'src/Types/Ksiazka';
import { Osoba } from 'src/Types/Osoba';

@Component({
  selector: 'app-wypozyczenia',
  templateUrl: './wypozyczenia.component.html',
  styleUrls: ['./wypozyczenia.component.css'],
})
export class WypozyczeniaComponent implements OnInit {
  constructor(private _loansService: LoansService) {}

  loans: Array<Wypozyczenie> = [];

  loansWD: Array<{ Loan: Wypozyczenie; Person: Osoba; Book: Ksiazka }> = [];

  ngOnInit(): void {
    this.getLoans();
    this.getLoansDescription();
  }
  ksiazkaInput: number = 0;
  osobaInput: number = 0;

  submit() {
    this._loansService.addLoans({
      idKsiazka: this.ksiazkaInput,
      idOsoba: this.osobaInput,
    });
  }

  getLoans() {
    this._loansService
      .getAllLoans()
      .subscribe((data) => (this.loans = [...data]));
  }

  getLoansDescription() {
    this._loansService
      .getLoansDetails()
      .subscribe((data) => (this.loansWD = data));
  }
}
