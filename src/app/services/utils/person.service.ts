import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Osoba } from 'src/Types/Osoba';
import { PersonStoreService } from '../persons/person-store.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private readonly personStoreSrv: PersonStoreService) {}

  getAllPersons(): Observable<Array<Osoba>> {
    return this.personStoreSrv.getAllPersons();
  }

  getSearchedPersons(searched: string): Observable<Array<Osoba>> {
    return this.personStoreSrv
      .getAllPersons()
      .pipe(
        map((val) =>
          val.filter((person: { imie: string; nazwisko: string }) =>
            (person.imie + '' + person.nazwisko)
              .toLocaleLowerCase()
              .includes(searched.toLocaleLowerCase())
          )
        )
      );
  }

  addPerson(toAdd: { imie: string; nazwisko: string }): void {
    let toAddId: number = -1;
    this.getAllPersons()
      .pipe(
        map(
          (val) =>
            val.reduce((max, val) => (val.id > max ? val.id : max), 0) + 1
        )
      )
      .subscribe((data) => (toAddId = data))
      .unsubscribe();
    this.personStoreSrv.addNewPerson({ id: toAddId, ...toAdd });
  }
  updatePerson(updated: Osoba): void {
    this.personStoreSrv.updatePerson(updated);
  }
  getPerson(id: number): Observable<Osoba | undefined> {
    return this.personStoreSrv.getPerson(id);
  }
  deletePerson(deleteId: number): void {
    this.personStoreSrv.deletePerson(deleteId);
  }
}
