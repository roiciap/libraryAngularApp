// todo: nie używane importy

import { Component, OnInit } from '@angular/core';
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

  loans: Array<LoanDescription> = [];
  peopleWithLoans: number = 0;

  ngOnInit(): void {
    this.getLoansDescription();
  }

  // todo: jak nie uzywane to wyjebanc
  getLoansDescription(): void {
    this.loansService
      .getLoansDetails({ returned: false })
      .subscribe(
        (data) => (
          (this.loans = data),
          (this.peopleWithLoans = new Set(
            data.map((loan) => loan.Person.id)
          ).size)
        )
      );
  }
  returnBook(loanID: number): void {
    this.loansService.returnBook(loanID);
  }
}
