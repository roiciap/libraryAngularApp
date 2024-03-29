import { userPaymentInfo } from '../services/loans/loans.service';
import { LoansService } from '../services/loans/loans.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oplaty',
  templateUrl: './oplaty.component.html',
  styleUrls: ['./oplaty.component.css'],
})
export class OplatyComponent implements OnInit {
  loans: Array<userPaymentInfo> = [];
  cashEarned: number = 0;
  cashToPay: number = 0;
  booksToReturn: number = 0;
  constructor(private readonly loansService: LoansService) {}

  ngOnInit(): void {
    this.loadData();
  }

  checkButtonColor(sum: number): string {
    if (sum == 0) {
      return 'p-button-secondary p-button-outlined';
    } else {
      return 'p-button-danger';
    }
  }
  alertPay(sum: number): string {
    if (sum != 0) {
      return 'alertToPay';
    } else {
      return 'alertNotToPay';
    }
  }
  loadData(): void {
    this.loansService.getAwaitingPaymentUsersInfo().subscribe((data) => {
      this.loans = data;
      this.booksToReturn = data.reduce(
        (sum, loan) => sum + loan.booksAmount,
        0
      );
      this.cashToPay = data.reduce((sum, loan) => sum + loan.toPay, 0);
    });
    this.loansService
      .getLoansDetails({ paid: true })
      .subscribe(
        (data) =>
          (this.cashEarned = data.reduce(
            (sum, loan) => sum + loan.Payment.kwota,
            0
          ))
      );
  }
}
