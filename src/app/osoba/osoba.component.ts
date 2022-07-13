import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Osoba } from 'src/Types/Osoba';

import { PersonService } from '../services/person.service';
import { StringUtilsService } from '../services/utils/string-utils.service';

@Component({
  selector: 'app-osoba',
  templateUrl: './osoba.component.html',
  styleUrls: ['./osoba.component.css'],
})
export class OsobaComponent implements OnInit {
  constructor(
    private readonly _personService: PersonService,
    private readonly stringUtils: StringUtilsService
  ) {}

  persons: Array<Osoba> = [];
  searchedValue: string = '';
  showSearch: boolean = true;
  showList: boolean = false;
  showAdd: boolean = true;

  nameInput: string = '';
  surnameInput: string = '';

  editContext: Osoba | null = null;

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
  toggleEditBar(toEdit: Osoba = this.persons[5]) {
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
    this._personService
      .getAllPersons()
      .subscribe((data) => (this.persons = data.slice()));
  }

  personSearch(searched: string) {
    searched
      ? this._personService
          .getSearchedPersons(searched)
          .subscribe((data) => (this.persons = data.slice()))
      : this.getAllPersons();
  }

  addPerson(): void {
    this._personService.addPerson({
      imie: this.stringUtils.capitWord(this.nameInput),
      nazwisko: this.stringUtils.capitWord(this.surnameInput),
    });
    this.nameInput = '';
    this.surnameInput = '';
  }

  updatePerson() {
    if (this.editContext == null) return;
    this._personService.updatePerson({
      id: this.editContext.id,
      imie: this.stringUtils.capitWord(this.nameInput),
      nazwisko: this.stringUtils.capitWord(this.surnameInput),
    });
  }
}
