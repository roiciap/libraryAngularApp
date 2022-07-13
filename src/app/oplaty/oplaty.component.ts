import { LoansService } from './../services/Loans/loans.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-oplaty',
  templateUrl: './oplaty.component.html',
  styleUrls: ['./oplaty.component.css'],
})
export class OplatyComponent implements OnInit {
  id: string = '';

  constructor(
    private Activatedroute: ActivatedRoute,
    private loanService: LoansService,
    private router: Router
  ) {
    console.log();
    this.Activatedroute.paramMap.subscribe(
      (data) => (this.id = data.get('id') || '')
    );
  }
  ngOnInit(): void {}

  go() {
    this.router.navigateByUrl('/oplaty/1');
  }
  back() {
    this.router.navigateByUrl('/oplaty/0');
  }
}
