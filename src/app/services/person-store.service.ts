import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Osoba } from './../../Types/Osoba';

@Injectable()
export class PersonStoreService {
  private persons = new BehaviorSubject<Array<Osoba>>([
    { id: 1, imie: 'Janusz', nazwisko: 'Kowalski' },
    { id: 2, imie: 'Jan', nazwisko: 'Adamowski' },
    { id: 3, imie: 'Zbigniew', nazwisko: 'Karaś' },
    { id: 4, imie: 'Mariusz', nazwisko: 'Morgan' },
    { id: 5, imie: 'Marcin', nazwisko: 'Bandura' },
    { id: 6, imie: 'Adam', nazwisko: 'Ślusarz' },
    { id: 7, imie: 'Anna', nazwisko: 'Kowalska' },
    { id: 8, imie: 'Weronika', nazwisko: 'Kmiecik' },
    { id: 9, imie: 'Bożena', nazwisko: 'Krawiec' },
    { id: 10, imie: 'Malik', nazwisko: 'Montana' },
  ]);

  getAllPersons(): Observable<Array<Osoba>> {
    return this.persons.asObservable();
  }
}
