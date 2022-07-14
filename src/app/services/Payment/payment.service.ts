import { Wypozyczenie } from './../../../Types/Wypozyczenie';
import { LoansService } from './../Loans/loans.service';
import { Injectable } from '@angular/core';
import { PaymentStoreService } from './payment-store.service';
import { map, Observable } from 'rxjs';
import { Oplata } from 'src/Types/Oplata';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private paymentStore: PaymentStoreService) {}

  getAllPayments(LoanIdTarget?: Array<number>): Observable<Array<Oplata>> {
    let payments = this.paymentStore.getAllPayments();
    return LoanIdTarget == undefined
      ? payments
      : payments.pipe(
          map(
            (val) =>
              val.filter((pay) => LoanIdTarget.includes(pay.idWypozyczenia)) ///nw czy includes
          )
        );
  }
  PayLoan(LoanId: number) {
    let payment: Oplata | undefined;
    this.getPayment(LoanId).subscribe((data) => (payment = data));
    if (payment) {
      this.update({ ...payment, oplacone: true });
    }
  }

  getPayment(LoanId: number): Observable<Oplata | undefined> {
    return this.paymentStore.getPayment(LoanId);
  }
  update(payment: Oplata) {
    return this.paymentStore.update(payment);
  }
  addPayment(payment: Oplata) {
    return this.paymentStore.addPayment(payment);
  }
  refresh() {
    return this.paymentStore.refresh();
  }
  checkPaid(id: number): boolean {
    return this.paymentStore.checkPaid(id);
  }

  checkPaidLoan(id: number): boolean {
    return this.paymentStore.checkPaidLoan(id);
  }
}
