import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Oplata } from 'src/Types/Oplata';

@Injectable({
  providedIn: 'root',
})
export class PaymentStoreService {
  payments: Array<Oplata> = [];
  private paymentsObs: BehaviorSubject<Array<Oplata>> = new BehaviorSubject<
    Array<Oplata>
  >(this.payments);
  constructor() {}

  getAllPayments(): Observable<Array<Oplata>> {
    return this.paymentsObs.asObservable();
  }

  getPayment(LoanId: string): Observable<Oplata | undefined> {
    return this.getAllPayments().pipe(
      map((val) => val.find((payment) => payment.idWypozyczenia === LoanId))
    );
  }
  update(payment: Oplata) {
    const index = this.payments.findIndex((pay) => pay.id == payment.id);
    if (index < 0) {
      this.addPayment(payment);
    }
    this.payments[index] = payment;
    this.refresh();
  }
  addPayment(payment: Oplata) {
    const id = Math.random().toString(36).substring(2, 9);
    this.payments.push({ ...payment, id });
    this.paymentsObs.next(this.payments);
  }
  refresh() {
    this.paymentsObs.next(this.payments);
  }
  checkPaid(id: string): boolean {
    const toFind = this.payments.find((val) => val.id === id);
    return toFind?.oplacone === true;
  }

  checkPaidLoan(id: string): boolean {
    const toFind = this.payments.find((val) => val.idWypozyczenia === id);
    if (toFind == undefined) return false;
    return toFind?.oplacone === true;
  }
}
