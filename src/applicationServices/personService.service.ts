import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import LoanStore from 'src/domain/loanStore.service';
import PersonStore from 'src/domain/personStore.service';
import { Osoba } from 'src/models/Osoba';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(
    private readonly personStore: PersonStore,
    private readonly loanStore: LoanStore
  ) {}

  addPerson(person: Osoba): Observable<Osoba> {
    return this.personStore.add(person);
  }
  updatePerson(person: Osoba): Observable<Osoba> {
    return this.personStore.update(person);
  }
  getPerson(personId: string): Observable<Osoba> {
    return this.personStore.get(personId);
  }
  getAllPeople(searchedValue?: string): Observable<Array<Osoba>> {
    return this.personStore
      .getAll()
      .pipe(
        map((val) =>
          searchedValue !== undefined
            ? val.filter((person) =>
                [person.imie, person.nazwisko].join(' ').includes(searchedValue)
              )
            : val
        )
      );
  }
  deletePerson(personId: string): boolean {
    return this.personStore.delete(personId);
  }
}
