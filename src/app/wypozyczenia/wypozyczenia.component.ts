// todo: nie używane importy

import { Component, OnInit } from '@angular/core';
import { Wypozyczenie } from 'src/Types/Wypozyczenie';
import { LoanDescription } from 'src/Types/LoanDescription';
import { LoansService } from '../services/loans/loans.service';

@Component({
  selector: 'app-wypozyczenia',
  templateUrl: './wypozyczenia.component.html',
  styleUrls: ['./wypozyczenia.component.css'],
})
// todo czemu polska nazwa
export class WypozyczeniaComponent implements OnInit {
  // todo pierw deklarujemy zmienne potem constructor potem metody czystosć

  // todo po co _
  constructor(private loansService: LoansService) {}

  loans: Array<Wypozyczenie> = [];

  loansWD: Array<LoanDescription> = [];

  ngOnInit(): void {
    this.getLoansDescription(true);
  }
  ksiazkaInput: number = 0;
  osobaInput: number = 0;

  // todo: zwracany typ
  submit(): void {
    this.loansService.addLoan({
      idKsiazka: this.ksiazkaInput,
      idOsoba: this.osobaInput,
    });
  }

  getLoans(): void {
    this.loansService
      .getAllLoans()
      .subscribe((data) => (this.loans = [...data]));
  }

  // todo: jak nie uzywane to wyjebanc
  getLoansDescription(returned: boolean = false): void {
    this.loansService
      .getLoansDetails({ returned: false })
      .subscribe((data) => (this.loansWD = data));
  }
  returnBook(loanID: number): void {
    this.loansService.returnBook(loanID);
  }
}
