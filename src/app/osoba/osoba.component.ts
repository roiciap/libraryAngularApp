import { Component, OnInit } from '@angular/core';
import { Osoba } from 'src/Types/Osoba';
import { PersonStoreService } from '../services/person-store.service';

@Component({
  selector: 'app-osoba',
  templateUrl: './osoba.component.html',
  styleUrls: ['./osoba.component.css'],
})
export class OsobaComponent implements OnInit {
  constructor(private readonly personStoreSrv: PersonStoreService) {}
  persons: Array<Osoba> = [];

  ngOnInit(): void {
    this.personStoreSrv
      .getAllPersons()
      .subscribe((data) => (this.persons = data));
  }
}
