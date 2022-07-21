import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Oplata } from 'src/Types/Oplata';
import { PaymentStoreService } from './payment-store.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private paymentStore: PaymentStoreService) {}

  getAllPayments(): Observable<Array<Oplata>> {
    return this.paymentStore.getAllPayments();
  }

  getPayment(LoanId: string): Observable<Oplata | undefined> {
    return this.paymentStore.getPayment(LoanId);
  }
  update(payment: Oplata): void {
    return this.paymentStore.update(payment);
  }
  addPayment(payment: Oplata): void {
    return this.paymentStore.addPayment(payment);
  }
  refresh(): void {
    return this.paymentStore.refresh();
  }
  checkPaid(id: string): boolean {
    return this.paymentStore.checkPaid(id);
  }

  checkPaidLoan(id: string): boolean {
    return this.paymentStore.checkPaidLoan(id);
  }
}
