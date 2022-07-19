import { Component, OnInit } from '@angular/core';
import { LoanDescription } from 'src/Types/LoanDescription';
import { LoansService } from '../services/loans/loans.service';

@Component({
  selector: 'app-wypozyczenia',
  templateUrl: './wypozyczenia.component.html',
  styleUrls: ['./wypozyczenia.component.css'],
})
export class WypozyczeniaComponent implements OnInit {
  loans: Array<LoanDescription> = [];
  peopleWithLoans: number = 0;

  constructor(private loansService: LoansService) {}

  ngOnInit(): void {
    this.getLoansDescription();
  }

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
  returnBook(loanID: string): boolean {
    return this.loansService.returnBook(loanID);
  }
}
