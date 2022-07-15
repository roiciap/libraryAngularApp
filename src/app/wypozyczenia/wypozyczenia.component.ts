import { Component, OnInit } from '@angular/core';
import { Wypozyczenie } from 'src/Types/Wypozyczenie';
import { LoansService } from '../services/Loans/loans.service';
import { LoanDescription } from 'src/Types/LoanDescription';

@Component({
  selector: 'app-wypozyczenia',
  templateUrl: './wypozyczenia.component.html',
  styleUrls: ['./wypozyczenia.component.css'],
})
export class WypozyczeniaComponent implements OnInit {
  constructor(private _loansService: LoansService) {}

  loansWD: Array<LoanDescription> = [];

  ngOnInit(): void {
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

  getLoansDescription(returned: boolean = false) {
    this._loansService
      .getLoansDetails({ returned: false })
      .subscribe((data) => (this.loansWD = data));
  }
  returnBook(loanID: number) {
    this._loansService.returnBook(loanID);
  }
}
