import { Component, OnInit } from '@angular/core';
import { Osoba } from 'src/Types/Osoba';
import { MessageService } from 'primeng/api';
import { StringUtilsService } from '../services/utils/string-utils.service';
import { PersonService } from '../services/persons/person.service';
import { LoansService } from '../services/loans/loans.service';

@Component({
  selector: 'app-osoba',
  templateUrl: './osoba.component.html',
  styleUrls: ['./osoba.component.css'],
  providers: [MessageService],
})
export class OsobaComponent implements OnInit {
  persons: Array<Osoba> = [];
  searchedValue: string = '';
  showSearch: boolean = true;
  showList: boolean = false;
  showAdd: boolean = true;

  nameInput: string = '';
  surnameInput: string = '';

  editContext: Osoba | null = null;

  constructor(
    private readonly personService: PersonService,
    private readonly loansService: LoansService,
    private readonly stringUtils: StringUtilsService
  ) {}
  resetInput() {
    this.nameInput = '';
    this.surnameInput = '';
  }
  toggleList() {
    this.showList = !this.showList;
    console.log(this.showList);
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    console.log(this.showSearch);
    this.editContext = null; //
    this.showAdd = true;
  }
  toggleAddBar() {
    this.nameInput = '';
    this.surnameInput = '';
    this.showAdd = !this.showAdd;
    console.log(this.showAdd);
    this.showSearch = true;
    this.editContext = null;
  }
  toggleEditBar(toEdit: Osoba) {
    if (this.editContext == toEdit) {
      this.editContext = null;
      return;
    }
    this.editContext = toEdit;

    this.nameInput = toEdit.imie;
    this.surnameInput = toEdit.nazwisko;

    this.showAdd = true;
    this.showSearch = true;
  }

  ngOnInit(): void {
    this.getAllPersons();
  }

  getAllPersons() {
    this.personService
      .getAllPersons()
      .subscribe((data) => (this.persons = data.slice()));
  }

  personSearch(searched: string) {
    searched
      ? this.personService
          .getSearchedPersons(searched)
          .subscribe((data) => (this.persons = data.slice()))
      : this.getAllPersons();
  }

  addPerson(): void {
    this.personService.addPerson({
      imie: this.stringUtils.capitWord(this.nameInput),
      nazwisko: this.stringUtils.capitWord(this.surnameInput),
    });
    this.nameInput = '';
    this.surnameInput = '';
  }

  updatePerson() {
    if (this.editContext == null) return;
    this.personService.updatePerson({
      id: this.editContext.id,
      imie: this.stringUtils.capitWord(this.nameInput),
      nazwisko: this.stringUtils.capitWord(this.surnameInput),
    });
    this.editContext = null;
  }
  deletePerson(id: string): void {
    this.loansService.deletePerson(id);
  }
}
