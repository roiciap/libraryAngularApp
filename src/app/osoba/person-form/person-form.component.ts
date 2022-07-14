import { LoansService } from './../../services/Loans/loans.service';
import { LoanDescription } from 'src/Types/LoanDescription';
import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Osoba } from 'src/Types/Osoba';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
})
export class PersonFormComponent implements OnInit {
  id: string = '';
  person: Osoba | undefined;
  activeLoans: Array<LoanDescription> = [];
  loansHistory: Array<LoanDescription> = [];
  constructor(
    private router: Router,
    private Activatedroute: ActivatedRoute,
    private personService: PersonService,
    private loansService: LoansService
  ) {}
  ngOnInit(): void {
    this.Activatedroute.paramMap.subscribe(
      (data) => (this.id = data.get('id')?.trim() || '')
    );
    if (Number.isNaN(Number(this.id))) {
    } else {
      this.person = this.personService.getPerson(Number(this.id));
      this.loadData();
    }
    console.log(this.activeLoans);
    console.log(this.loansHistory);
  }
  loadData() {
    if (this.person) {
      this.loansService
        .getLoansDetails({ returned: true, personId: this.person.id })
        .subscribe((data) => (this.loansHistory = data.slice()));
      this.loansService
        .getLoansDetails({ returned: false, personId: this.person.id })
        .subscribe((data) => (this.activeLoans = data.slice()));
    }
  }
}
