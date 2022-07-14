import { LoanDescription } from 'src/Types/LoanDescription';
import { LoansService } from './../../services/Loans/loans.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/Books/book.service';
import { Ksiazka } from 'src/Types/Ksiazka';
import { Osoba } from 'src/Types/Osoba';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  id: string = '';
  book: Ksiazka | undefined;
  loans: Array<LoanDescription> = [];
  showSearch: boolean = true;
  showEdit: boolean = true;
  // editContext: Osoba | null = null;
  BookFormComponent: any;

  toggleSearch() {
    this.showSearch = !this.showSearch;
    this.showEdit = true;
  }

  toggleEditBar() {
    this.showEdit = !this.showEdit;
    this.showSearch = true;
    // if (this.editContext == toEdit) {
    //   this.editContext = null;
    //   return;
    // }
    // this.editContext = toEdit;

    // this.nameInput = toEdit.imie;
    // this.surnameInput = toEdit.nazwisko;

    // this.showAdd = true;
    // this.showSearch = true;
  }

  constructor(
    private router: Router,
    private loansService: LoansService,
    private Activatedroute: ActivatedRoute,
    private bookService: BookService
  ) {}
  ngOnInit(): void {
    this.Activatedroute.paramMap.subscribe(
      (data) => (this.id = data.get('id')?.trim() || '')
    );
    if (Number.isNaN(Number(this.id))) {
    } else {
      this.book = this.bookService.getBook(Number(this.id));
      this.loadData();
    }
  }
  loadData() {
    this.loansService
      .getLoansDetails({
        returned: false,
        bookId: this.book?.id,
      })
      .subscribe((data) => (this.loans = data));
    console.log(this.loans);
  }
}
