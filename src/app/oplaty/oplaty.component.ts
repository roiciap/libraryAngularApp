import { LoansService } from '../services/loans/loans.service';
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

  // nie używane service i  czemu nie readonly
  constructor(
    private Activatedroute: ActivatedRoute,
    private loanService: LoansService,
    private router: Router
  ) {
    this.Activatedroute.paramMap.subscribe(
      (data) => (this.id = data.get('id') || '')
    );
  }
  ngOnInit(): void {}
}
