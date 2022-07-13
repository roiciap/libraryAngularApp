import { Component, OnInit } from '@angular/core';
import { Osoba } from 'src/Types/Osoba';

import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-osoba',
  templateUrl: './osoba.component.html',
  styleUrls: ['./osoba.component.css'],
})
export class OsobaComponent implements OnInit {
  constructor(private _personService: PersonService) {}
  persons: Array<Osoba> = [];
  searchedValue: string = '';
  showSearch: boolean = true;
  showList: boolean = false;
  toggleList() {
    this.showList = !this.showList;
    console.log(this.showList);
  }
  toggleSearch() {
    this.showSearch = !this.showSearch;
    console.log(this.showSearch);
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

  addPerson(toAdd: { imie: string; nazwisko: string }) {
    this._personService.addPerson(toAdd);
  }
}
