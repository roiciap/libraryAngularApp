import { Observable } from 'rxjs';
import { LoanDescription } from '../../models/LoanDescription';
export default interface ILoanGateway {
  getLoansDescription(
    settings?: {
      returned?: boolean;
      personId?: string;
      bookId?: string;
      paid?: boolean;
      loanId?: string;
    },
    search?: { personName: string }
  ): Observable<Array<LoanDescription>>;
}
